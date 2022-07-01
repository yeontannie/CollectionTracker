using FluentValidation;

namespace CollectionTracker.Core.Validators
{
    public class LikeValidator : AbstractValidator<Like>
    {
        public LikeValidator()
        {
            RuleFor(l => l.ItemId).NotEmpty().NotNull();
            RuleFor(l => l.UserName).NotEmpty().NotNull();
        }
    }
}
