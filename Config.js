// Config.js
import * as AppAuth from 'react-native-app-auth';

export const microsoftConfig = {
  issuer: 'https://login.microsoftonline.com/74ac9228-53f2-4ced-b479-b365b689ece2/v2.0/.well-known/openid-configuration',
  clientId: 'ab5e393b-aab9-4c48-b5e8-5529225b02b7',
  redirectUrl: 'http://localhost:3000',
  scopes: ['openid', 'profile', 'User.Read'],
  additionalParameters: { prompt: 'login' },
};
