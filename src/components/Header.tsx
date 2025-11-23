import React, {useState} from 'react';
import './Header.css';
import icon from '../assets/Twenty.png';
import Profile from "./Profile.tsx";

const Header: React.FC = () => {
    const [token, setToken] = useState(localStorage.getItem('accessToken') !== null);

    window.addEventListener('token', (event) => {
        if (event instanceof CustomEvent) setToken(event.detail);
    });

    return (
        <header className='header'>
            <a href='/' className='twenty-logo'>
                <img src={icon} alt='Twenty' className='twenty-icon'/>
                <h1>Twenty</h1>
            </a>
            <nav className='navigation'>
                <a href='/news'>
                    <p>새소식</p>
                </a>
            </nav>
            {<Profile isLoggedIn={token}/>}
        </header>
    );
}

export default Header;