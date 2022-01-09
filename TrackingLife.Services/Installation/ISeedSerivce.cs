using System;

namespace TrackingLife.Services.Installation
{
    public interface ISeedSerivce
    {
        void InstallData(IServiceProvider services);
    }
}