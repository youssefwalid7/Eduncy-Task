import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
export const getCognitoPublicKeys = async () => {
    const jwksUrl = 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_vHYnInu5k/.well-known/jwks.json';
    try {
        const response = await fetch(jwksUrl);
        const jwks = await response.json();
        // console.log(jwks.keys[0].kid)
        // jwks.keys is an array of public keys you can use for JWT verification
        return jwks.keys;
    } catch (error) {
        console.error('Error fetching Cognito JWKS:', error);
        throw error;
    }
}

// Verify the Cognito token using JWKS
export const verifyCognitoToken = async (req, res, next) => {
    // Get the token from the request headers;
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Extract the token from the "Bearer" prefix
    const token = authorizationHeader.split(' ')[1];
    const user = jwt.decode(token, { complete: true });
    const keys = await getCognitoPublicKeys()
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].kid == user.header.kid) {
            return next();
        }
        else {
            return res.status(401).json({ message: 'Not Authorized' });
        }
    }
}

export const tokenDecodeAdminTool = async (req, res, next) => {
    // Get the token from the request headers;
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Extract the token from the "Bearer" prefix
    const token = authorizationHeader.split(' ')[1];
    const user = jwt.decode(token, { complete: true });
    if (user.payload['cognito:groups'][0] == 'dev-test') {
        console.log("here")
        return next();
    } else {
        return res.status(401).json({ message: 'Not Authorized' });
    }
}

export const tokenDecodeCt = async (req, res, next) => {
    // Get the token from the request headers;
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Extract the token from the "Bearer" prefix
    const token = authorizationHeader.split(' ')[1];
    const user = jwt.decode(token, { complete: true });
    if (user.payload['cognito:groups'][0] == 'contenttool') {
        return next();
    } else {
        return res.status(401).json({ message: 'Not Authorized' });
    }
}
