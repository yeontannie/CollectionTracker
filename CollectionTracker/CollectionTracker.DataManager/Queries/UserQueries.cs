using CollectionTracker.Core;
using Microsoft.AspNetCore.Identity;

namespace CollectionTracker.DataManager.Queries
{
    public class UserQueries
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public UserQueries(UserManager<User> userM,
            RoleManager<IdentityRole> roleM)
        {
            userManager = userM;
            roleManager = roleM;
        }

        public async Task<User> UserExists(string email)
        {
            return await userManager.FindByEmailAsync(email.ToUpper());
        }
    }
}
