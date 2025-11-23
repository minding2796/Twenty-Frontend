import React from 'react';
import './Footer.css';
import tgs_icon from '../assets/Thinking_Games.png';
import github_icon from '../assets/github-mark-white.svg'

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <nav className='footer-nav'>
                <a href="https://thinkinggms.com/">
                    <img src={tgs_icon} alt="icon"/>
                    <span>Thinking Games</span>
                </a>
                <span>|</span>
                <a href="https://github.com/minding2796" target="_blank">
                    <img src={github_icon} alt="github"/>
                    <span>Github</span>
                </a>
            </nav>
            <p>
                대표 : minding2796 · 문의 : support@thinkinggms.com<br/>
                Copyright 2025. Thinking Games. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;