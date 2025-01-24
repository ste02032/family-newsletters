import { GoogleLogin } from '@react-oauth/google';

function Authentication() {
    
    return (
        <div className="w-full">
            <div className="w-60 m-auto p-2">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    )
}

export default Authentication;