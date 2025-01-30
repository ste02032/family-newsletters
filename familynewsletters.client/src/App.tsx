import './App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Contacts from './Components/Contacts';
import Families from './Components/Families';
import NewsletterDefinitionList from './Components/NewsletterDefinitionList';
import SystemSettings from './Components/SystemSettings';
import Newsletters from './Components/Newsletters';
import Home from './Components/Home';

function App() {

    const loginUserData = localStorage.getItem("loginUserData");
    console.log(loginUserData);
    const loginUser = loginUserData === null ? null : loginUserData as GoogleUserProfile

    return (
        <div>
            <Navbar />
            <div>
                {loginUser != null  &&
                    <Routes>
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/families" element={<Families />} />
                        <Route path="/newsletter-definitions" element={<NewsletterDefinitionList />} />
                        <Route path="/system-settings" element={<SystemSettings />} />
                        <Route path="/newsletters" element={<Newsletters />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                }
            </div>
        </div>
    );
}

export default App;