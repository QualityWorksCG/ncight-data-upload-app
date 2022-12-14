export interface CognitoUser {
  username: string;
  pool: Pool;
  Session?: any;
  client: Client;
  signInUserSession: SignInUserSession;
  authenticationFlowType: string;
  storage: Storage;
  keyPrefix: string;
  userDataKey: string;
  attributes: Attributes;
  preferredMFA: string;
}

interface Attributes {
  sub: string;
  email_verified: boolean;
  phone_number_verified: boolean;
  phone_number: string;
  "custom:orthopedicPractice": string;
  given_name: string;
  family_name: string;
  email: string;
  "custom:city": string;
}

interface SignInUserSession {
  idToken: IdToken;
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  clockDrift: number;
}

interface AccessToken {
  jwtToken: string;
  payload: Payload2;
}

interface Payload2 {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}

interface RefreshToken {
  token: string;
}

interface IdToken {
  jwtToken: string;
  payload: Payload;
}

interface Payload {
  sub: string;
  email_verified: boolean;
  iss: string;
  phone_number_verified: boolean;
  "cognito:username": string;
  given_name: string;
  "custom:city": string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  phone_number: string;
  "custom:orthopedicPractice": string;
  exp: number;
  iat: number;
  family_name: string;
  jti: string;
  email: string;
}

interface Pool {
  userPoolId: string;
  clientId: string;
  client: Client;
  advancedSecurityDataCollectionFlag: boolean;
  storage: Storage;
}

interface Storage {
  "amplify-signin-with-hostedUI": string;
  "CognitoIdentityServiceProvider.5r79qm7vamq91saefumkjvedc5.d4026372-a9c5-400e-a0d8-cb4abaae59bc.refreshToken": string;
  "nextauth.message": string;
  "@@auth0spajs@@::s8Un0qi0DNGDFpIcyAEvmSt3y2KKAHxj::http://localhost:3000/::openid profile email read:current_user update:current_user_metadata offline_access": string;
  reactQueryDevtoolsActiveQueryHash: string;
  reactQueryDevtoolsSortFn: string;
  "CognitoIdentityServiceProvider.5r79qm7vamq91saefumkjvedc5.d4026372-a9c5-400e-a0d8-cb4abaae59bc.userData": string;
  "CognitoIdentityServiceProvider.5r79qm7vamq91saefumkjvedc5.d4026372-a9c5-400e-a0d8-cb4abaae59bc.accessToken": string;
  "CognitoIdentityServiceProvider.5r79qm7vamq91saefumkjvedc5.d4026372-a9c5-400e-a0d8-cb4abaae59bc.idToken": string;
  "chakra-ui-color-mode": string;
  items: string;
  "CognitoIdentityServiceProvider.5r79qm7vamq91saefumkjvedc5.d4026372-a9c5-400e-a0d8-cb4abaae59bc.clockDrift": string;
  "ally-supports-cache": string;
  auth0token: string;
  "CognitoIdentityServiceProvider.5r79qm7vamq91saefumkjvedc5.LastAuthUser": string;
  reactQueryDevtoolsOpen: string;
}

interface Client {
  endpoint: string;
  fetchOptions: FetchOptions;
}

interface FetchOptions {}
