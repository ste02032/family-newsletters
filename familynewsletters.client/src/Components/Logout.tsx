import { googleLogout } from '@react-oauth/google';

function Logout() {

    const logOut = () => {
        googleLogout();
        localStorage.removeItem('loginData');
        localStorage.removeItem('loginUserData');
    };

    return (
        <a href="/" onClick={logOut} className="pr-4">Logout</a>
    )
}

export default Logout;
