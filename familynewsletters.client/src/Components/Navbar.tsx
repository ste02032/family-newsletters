import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import { GoogleUserProfile } from '../Types/googleUserProfile';

function Navbar() {

    //const loginData = localStorage.getItem("loginData");
    const loginUserData = localStorage.getItem("loginUserData");
    console.log(loginUserData);
    const loginUser = loginUserData === null ? null : loginUserData as GoogleUserProfile
    return (
        <div className='bg-black flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
            {/* Logo */}
            <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Family Newsletters</h1>

            <Link to="/" className="pr-4">Home</Link>
            <Link to="/contacts" className="pr-4">Contacts</Link>
            <Link to="/families" className="pr-4">Families</Link>
            <Link to="/newsletter-definitions" className="pr-4">Newsletter Definitions</Link>
            <Link to="/newsletters" className="pr-4">Newsletters</Link>
            <Link to="/system-settings" className="pr-4">Settings</Link>
            {loginUser === null ? (
                <Login />
            ): (
                <Logout />
            )}
        </div>
    )
}

export default Navbar;