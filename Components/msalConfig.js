// msalConfig.js

const authority = 'https://login.microsoftonline.com/74ac9228-53f2-4ced-b479-b365b689ece2/v2.0/.well-known/openid-configuration'; // Replace with your tenant ID
const clientId = 'ab5e393b-aab9-4c48-b5e8-5529225b02b7'; // Replace with your client ID
const redirectUri = 'http://localhost:3000'; // Replace with your redirect URI

const msalConfig = {
    authority,
    clientId,
    redirectUri,
};

export default msalConfig;
