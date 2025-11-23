import React from 'react';
import './HoverProfile.css';
import mpf from '../assets/my-profile.svg';
import lgo from '../assets/logout.svg';
import admin from '../assets/admin.svg';
import type {UserData} from "../utils/api.tsx";

interface HoverProfileProps {
    user: UserData,
}

const HoverProfile: React.FC<HoverProfileProps> = ({user}) => {
    const handleProfile = () => {
        window.location.href = '/my-page';
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.dispatchEvent(new CustomEvent('token', { detail: false }));
        if (window.location.pathname === '/my-page' || window.location.pathname === '/my-page/edit') {
            window.location.href = '/login';
        }
    };

    return (
        <div className="profile-overlay">
            <div className='player-profile'>
                <img src={user.picture} alt="profile" />
                <p>{user.name}</p>
                {(user.role === 'ADMIN' ? <img src={admin} alt='admin' className='admin-profile'/> : <></>)}
            </div>
            <hr/>
            <button onClick={handleProfile}><img src={mpf} alt='Profile'/>내 정보</button>
            <button onClick={handleLogout}><img src={lgo} alt='Logout'/>로그아웃</button>
        </div>
    );
}

export default HoverProfile;