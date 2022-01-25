using System.Collections.Generic;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace TrackingLife.Services.Identity.Auth
{
    public class IdentityServerConfig
    {
        public const string ApiName = "trackingLife_api";

        public const string QueallyFriendlyName = "Tracking Life SPA";
        public const string QueallyClientId = "trackingLife_spa";

        public const string SwaggerFriendlyName = "Swagger UI";
        public const string SwaggerClientId = "swagger_ui";

        // Identity resources (used by UserInfo endpoint).
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Phone(),
                new IdentityResources.Email(),
                new IdentityResource(JwtClaimTypes.Role, new List<string> { JwtClaimTypes.Role })
            };
        }

        // Api resources.
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(ApiName) {
                    UserClaims = {
                        JwtClaimTypes.Name,
                        JwtClaimTypes.Email,
                        JwtClaimTypes.PhoneNumber,
                        JwtClaimTypes.Role
                    }
                }
            };
        }

        // Clients want to access resources.
        public static IEnumerable<Client> GetClients()
        {
            // Clients credentials.
            return new List<Client>
            {
                new Client
                {
                    ClientId = QueallyClientId,
                    ClientName = QueallyFriendlyName,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // Resource Owner Password Credential grant.
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret = false, // This client does not need a secret to request tokens from the token endpoint.
                    
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId, // For UserInfo endpoint.
                        IdentityServerConstants.StandardScopes.Profile
                    },
                    AllowOfflineAccess = true, // For refresh token.
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    AccessTokenLifetime = 60 * 60, // 1 hour
                    AbsoluteRefreshTokenLifetime = 0,
                    SlidingRefreshTokenLifetime = 60 * 60 * 24 * 60, //60 days
                },

                new Client
                {
                    ClientId = SwaggerClientId,
                    ClientName = SwaggerFriendlyName,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret = false,

                    AllowedScopes = {
                        ApiName
                    }
                }
            };
        }
    }
}
