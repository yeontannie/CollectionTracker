namespace CollectionTracker.Core.Requests
{
    public class CreateCollectionRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Theme { get; set; }
        public string UserName { get; set; }
        public int ItemsAmount { get; set; }
    }
}
