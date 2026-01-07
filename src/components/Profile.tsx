import React, {useEffect, useRef, useState} from 'react';
import './Profile.css';
import non_profile from '../assets/non_profile.svg';
import {api, type UserData} from "../utils/api.tsx";
import HoverProfile from "../components/HoverProfile.tsx";

interface ProfileProps {
    isLoggedIn: boolean;
}

const Profile: React.FC<ProfileProps> = ({isLoggedIn}) => {
    const [user, setUser] = useState<UserData>({id: "", name: "", email: "", picture: non_profile, provider: "DISCORD", role: "USER"});
    const [toggle, setToggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleProfile = async () => {
            const user: UserData = await api.getMe();
            setUser(user);
        };

        window.addEventListener('profile', (e) => {
            if (e instanceof CustomEvent) setUser(e.detail);
        });

        handleProfile().then();
    }, []);

    const toggleProfile = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setToggle(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        isLoggedIn
            ? (
                <div ref={ref}>
                    <button onClick={toggleProfile} className='profile-button'><img src={user.picture} alt='프로필' className='profile-image'/></button>
                    {(toggle ? <HoverProfile user={user}/> : <></>)}
                </div>
            )
            : (
                <a href='/login' className='profile-button'><button className='profile-login-button'>로그인</button></a>
            )
    );
};

export default Profile;