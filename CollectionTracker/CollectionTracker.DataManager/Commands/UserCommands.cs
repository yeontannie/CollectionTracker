using CollectionTracker.Core;
using Microsoft.AspNetCore.Identity;

namespace CollectionTracker.DataManager.Commands
{
    public class UserCommands
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public UserCommands(UserManager<User> userM,
            RoleManager<IdentityRole> roleM)
        {
            userManager = userM;
            roleManager = roleM;
        }

        public User InitUser(string email)
        {
            User user = new()
            {
                Email = email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = email.Split('@').First()
            };
            return user;
        }

        public async Task<IdentityResult> CreateUser(User user, string password)
        {
            return await userManager.CreateAsync(user, password);

        }

        public async void CreateRoles()
        {
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            }
            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            }
        }

        public async void RefreshUsersToken(User user)
        {
            user.RefreshToken = null;
            await userManager.UpdateAsync(user);
        }
    }
}
