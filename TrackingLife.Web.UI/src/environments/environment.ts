// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  loginUrl: '/login',
  baseUrl: 'https://localhost:51928', // Change this to the address of your backend API if different from frontend address
  apiUrl: 'http://localhost:51928/api', // For frontent API HTTP
  webUrl: 'http://localhost:51929', // For frontent Web HTTP
  tokenUrl: 'http://localhost:51928', // For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
};
