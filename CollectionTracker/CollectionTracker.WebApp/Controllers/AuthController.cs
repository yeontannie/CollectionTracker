using CollectionTracker.Core;
using CollectionTracker.Core.Requests;
using CollectionTracker.DataManager.Commands;
using CollectionTracker.DataManager.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CollectionTracker.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private readonly UserQueries userQueries;
        private readonly UserCommands userCommands;
        private readonly TokenCommands tokenCommands;

        public AuthController(UserManager<User> userM, IConfiguration config, 
            UserQueries userQ, UserCommands userC, TokenCommands tokenC, RoleManager<IdentityRole> roleM)
        {
            userManager = userM;
            configuration = config;
            userQueries = userQ;
            userCommands = userC;
            tokenCommands = tokenC;
            roleManager = roleM;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(AuthRequest model)
        {
            var userExists = await userQueries.UserExists(model.Email);
            if (userExists != null && await userManager.CheckPasswordAsync(userExists, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(userExists);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, userExists.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = tokenCommands.GenerateToken(authClaims);
                var refreshToken = tokenCommands.GenerateRefreshToken();
                var expiresIn = int.Parse(configuration["JWT:RefreshTokenValidityInDays"]);

                userExists.RefreshToken = refreshToken;
                userExists.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(expiresIn);
                await userManager.UpdateAsync(userExists);

                return Ok(new
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    RefreshToken = refreshToken,
                    Expiration = token.ValidTo
                });
            }
            return StatusCode(StatusCodes.Status401Unauthorized);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(AuthRequest model)
        {
            var userExists = await userQueries.UserExists(model.Email);
            if(userExists != null)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            var user = userCommands.InitUser(model.Email);
            var result = await userCommands.CreateUser(user, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            if (!await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            }
            if (await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await userManager.AddToRoleAsync(user, UserRoles.User);
            }
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin(AuthRequest model)
        {
            var userExists = await userQueries.UserExists(model.Email);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            var user = userCommands.InitUser(model.Email);
            var result = await userCommands.CreateUser(user, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            }
            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(Token model)
        {
            if (model is null)
            {
                return BadRequest("Invalid client request");
            }

            var principal = tokenCommands.GetPrincipalFromExpiredToken(model.AccessToken);
            if (principal == null)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            string username = principal.Identity.Name;
            var user = await userManager.FindByNameAsync(username);
            if (user == null || user.RefreshToken != model.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            var newAccessToken = tokenCommands.GenerateToken(principal.Claims.ToList());
            var newRefreshToken = tokenCommands.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await userManager.UpdateAsync(user);

            return new ObjectResult(new
            {
                accessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                refreshToken = newRefreshToken
            });
        }

        [Authorize]
        [HttpPost]
        [Route("revoke/{username}")]
        public async Task<IActionResult> Revoke(string username)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null)
            {
                return BadRequest("Invalid user name");
            }
            userCommands.RefreshUsersToken(user);
            return NoContent();
        }

        //[Authorize]
        //[HttpPost]
        //[Route("revoke-all")]
        //public async Task<IActionResult> RevokeAll()
        //{
        //    var users = userManager.Users.ToList();
        //    foreach (var user in users)
        //    {
        //        userCommands.RefreshUsersToken(user);
        //    }
        //    return NoContent();
        //}
    }
}
