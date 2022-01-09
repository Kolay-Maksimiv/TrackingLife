using TrackingLife.Data.Domain.Identity;
using TrackingLife.Web.Api.ViewModels.AspNetUser;

namespace TrackingLife.Web.Api.Mappings.AspNetUser
{
    /// <summary>
    /// Profile view model to entity mapping
    /// </summary>
    public class ViewModelToEntityMappingProfile : AutoMapper.Profile
    {
        /// <summary>
        /// Profile view model to entity mapping constructor
        /// </summary>
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, ApplicationUser>()
                .ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));

            CreateMap<CreateUserViewModel, ApplicationUser>()
              .ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}