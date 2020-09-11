import React from 'react';
import s from './Header.module.css';

function Header(props) {
    return (
        <header className={s.header}>
            <img src='https://seeklogo.com/images/Y/youtube-square-logo-3F9D037665-seeklogo.com.png' alt=""/>
        </header>
    );
}

export default Header;