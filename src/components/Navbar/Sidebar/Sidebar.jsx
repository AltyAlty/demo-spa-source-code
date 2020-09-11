import React from 'react';
import s from './Sidebar.module.css';
import {NavLink} from "react-router-dom";

function Sidebar(props) {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.sidebar}>
            <div>
                <NavLink to={path} activeClassName={s.active}>
                    <img src={props.avatar} alt=""/>

                    <div>
                        {props.name}
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;