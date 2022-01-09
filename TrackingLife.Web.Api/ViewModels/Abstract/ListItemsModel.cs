using Newtonsoft.Json;
using System.Collections.Generic;

namespace TrackingLife.Web.Api.ViewModels.Abstract
{
    public class ListItemsModel<T>
    {
        [JsonProperty(PropertyName = "items")]
        public IList<T> Items { get; set; }

        [JsonProperty(PropertyName = "count")]
        public int Counts { get; set; }

        public ListItemsModel(IList<T> items, int count)
        {
            Items = items;
            Counts = count;
        }
    }
}
