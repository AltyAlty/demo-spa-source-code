import React from 'react';
import s from './../Dialogs.module.css';

function IncomingMessage(props) {
    return (
        <div className={s.incomingMessage}>
            {props.message}
            <img src={props.avatar} alt="."/>
        </div>
    )
}

export default IncomingMessage;