using CollectionTracker.Core.Requests;
using FluentValidation;

namespace CollectionTracker.Core.Validators
{
    public class AuthRequestValidator: AbstractValidator<AuthRequest>
    {
        public AuthRequestValidator()
        {
            RuleFor(e => e.Email).NotEmpty().NotNull().EmailAddress();
            RuleFor(p => p.Password).NotEmpty().NotNull();
        }
    }
}
