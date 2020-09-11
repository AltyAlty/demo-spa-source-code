import React from 'react';
import s from './../Dialogs.module.css';

function Message(props) {
    return (
        <div className={s.message}>
            <img src={props.avatar} alt="."/>
            {props.message}
        </div>
    )
}

export default Message;