import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { getRequest } from "../hooks/useRequest";
import { GoogleUserProfile } from '../Types/googleUserProfile';

function Authentication() {
    const [googleProfile, setGoogleProfile] = useState<GoogleUserProfile>();

    const { get } = getRequest("/Authentication/Login");

    const handleGoogleLoginSuccess = (response: CredentialResponse) => {
        // Handle successful Google login (e.g., save user data, redirect, etc.)
        console.log(response);
        // now call our api to verify google jwt token and get information about user and set server user session
        const headers: HeadersInit = {
            'Authorization': 'Bearer ' + response.credential
        };

        const verifyOAuth = async () => {
            const oauthResponse = await get(headers) as GoogleUserProfile;
            setGoogleProfile(oauthResponse);
            localStorage.setItem('loginData', JSON.stringify(response));
            localStorage.setItem('loginUserData', JSON.stringify(oauthResponse));
        };
        verifyOAuth();
    };

    const handleGoogleLoginFailure = () => {
        // Handle failed Google login
        console.error('Google login error');
    };

    return (
        <div className="w-full">
            <div className="w-60 m-auto p-2">
                {googleProfile === undefined ? (
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginFailure}
                    />
                ) : (
                    <span>Welcome {googleProfile?.name}</span>
                )}
            </div>
        </div>
    )
}

export default Authentication;