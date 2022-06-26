using CollectionTracker.Core.Requests;
using FluentValidation;

namespace CollectionTracker.Core.Validators
{
    public class CollectionValidator : AbstractValidator<CreateCollectionRequest>
    {
        public CollectionValidator()
        {
            RuleFor(c => c.Name).NotEmpty().NotNull();
            RuleFor(c => c.Description).NotEmpty().NotNull();
            RuleFor(c => c.Theme).NotEmpty().NotNull();
            RuleFor(c => c.UserName).NotEmpty().NotNull();
            RuleFor(c => c.ItemsAmount).NotEmpty().NotNull();
        }
    }
}
