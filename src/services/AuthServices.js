import AmazonCognito from 'amazon-cognito-identity-js'
import pooldata from '../config/cognito.js'
import { SaveUser } from './dbServices.js';
const userPool = new AmazonCognito.CognitoUserPool(pooldata);

// User sign-up function (cognito logic)
export const signup = async (UserName, Email, Password) => {
    const attributeList = [];
    const emailAttribute = {
        Name: 'email',
        Value: Email,
    };
    const usernameAttribute = {
        Name: 'preferred_username',
        Value: UserName || "",
    };

    // Create CognitoUserAttribute instances
    const attributeEmail = new AmazonCognito.CognitoUserAttribute(emailAttribute);
    const attributeUserName = new AmazonCognito.CognitoUserAttribute(usernameAttribute);

    attributeList.push(attributeEmail);
    attributeList.push(attributeUserName);

    // Call userPool.signUp() to initiate user sign-up process
    userPool.signUp(Email, Password, attributeList, null, function (err, result) {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            return;
        } else {
            return result;
        }
        // const cognitoUser = result.user;
        // console.log('User name is ' );
    });
}



// Function to verify user's email using confirmation code
export const verifyEmail = async (Name, Email, Code) => {
    var userData = {
        Username: Email,
        Pool: userPool,
    };
    var cognitoUser = new AmazonCognito.CognitoUser(userData);
    console.log(Name)
    console.log(Email)
    console.log(Code)
    cognitoUser.confirmRegistration(Code, true, function (err, result) {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            return;
        } else {
            SaveUser(Name, Email)
            console.log('email verified');
        }
    });
}

// Function to resend confirmation code to user's email
export const resendCode = async (Email) => {

    var userData = {
        Username: Email,
        Pool: userPool,
    };

    const cognitoUser = new AmazonCognito.CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function (err, result) {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            return;
        }
        console.log('code send Successfully');
    });
}

// User sign-in function
export const signin = async (Email, Password) => {
    return new Promise((resolve, reject) => {

        var userData = {
            Username: Email,
            Pool: userPool,
        };
        var cognitoUser = new AmazonCognito.CognitoUser(userData);

        var authenticationData = {
            Username: Email,
            Password: Password,
        };
        var authenticationDetails = new AmazonCognito.AuthenticationDetails(authenticationData);
        // Authenticate user using authentication details
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                // var accessToken = result.getAccessToken().getJwtToken();
                var token = result.getIdToken().getJwtToken();
                resolve(token); // Return the access token upon successful authentication
            },
            onFailure: function (err) {
                console.error(err.message || JSON.stringify(err));
                reject(err)
            },
        });
    });
}

export const signout = async () => {
    var cognitoUser = userPool.getCurrentUser();
    cognitoUser.getSession((err, result) => {
        if (result) {
            cognitoUser.globalSignOut({
                onSuccess: (result) => {
                    console.log(result)
                },
                onFailure: (err) => {
                    console.log(err)
                },
            });
        } else {
            console.error(err)
        }
    });
}
