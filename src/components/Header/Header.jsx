import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

function Header(props) {
    return (
        <header className={s.header}>
            <img src='https://seeklogo.com/images/Y/youtube-square-logo-3F9D037665-seeklogo.com.png' alt=""/>

            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login/'}>Log in</NavLink>}
            </div>
        </header>
    );
};

export default Header;