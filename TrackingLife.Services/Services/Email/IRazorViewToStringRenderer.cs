using System.Threading.Tasks;

namespace TrackingLife.Services.Services.Email
{
    public interface IRazorViewToStringRenderer
    {
        Task<string> RenderViewToStringAsync<TModel>(string viewName, TModel model);
    }
}