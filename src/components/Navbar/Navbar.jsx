import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

function Navbar(props) {
    let sidebarElements = props.sidebar.friendsData.map(f => <Sidebar name={f.name}
                                                                      id={f.id}
                                                                      avatar={f.avatar}
                                                                      key={f.id}/>);

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile/' activeClassName={s.activeLink}>Profile</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/dialogs/' activeClassName={s.activeLink}>Dialogs</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/users/' activeClassName={s.activeLink}>Users</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/news/' activeClassName={s.activeLink}>News</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/music/' activeClassName={s.activeLink}>Music</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/settings/' activeClassName={s.activeLink}>Settings</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/friends/' activeClassName={s.activeLink}>Friends</NavLink>
            </div>

            <div className={s.sidebarText}>Online:</div>

            {sidebarElements}
        </nav>
    );
};

export default Navbar;