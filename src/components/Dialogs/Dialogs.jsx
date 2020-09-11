import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import IncomingMessage from "./IncomingMessage/IncomingMessage";

function Dialogs(props) {
    let dialogsElements = props.dialogPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} avatar={d.avatar}/>);

    let messagesElements = props.dialogPage.messagesData.map(m => <Message id={m.id} message={m.message} avatar={m.avatar}/>);

    let incomingMessagesElement = props.dialogPage.incomingMessagesData.map(m => <IncomingMessage id={m.id} message={m.message} avatar={m.avatar}/>);

    let newMessageElement = React.createRef();

    let addPost = () => {
        props.addMessage();
    };

    let onMessageChange = () => {
        let message = newMessageElement.current.value;
        props.updateNewMessageText(message);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}

                <div>
                    <div>
                        <textarea onChange={onMessageChange} ref={newMessageElement} value={props.dialogPage.newMessageText} />
                    </div>

                    <div>
                        <button onClick={addPost}>Add message</button>
                    </div>
                </div>
            </div>

            <div className={s.incomingMessages}>
                {incomingMessagesElement}
            </div>
        </div>
    );
}

export default Dialogs;