import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import IncomingMessage from "./IncomingMessage/IncomingMessage";

function Dialogs(props) {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name}
                                                                         id={d.id}
                                                                         avatar={d.avatar}
                                                                         key={d.id}/>);

    let messagesElements = props.dialogsPage.messagesData.map(m => <Message id={m.id}
                                                                            message={m.message}
                                                                            avatar={m.avatar}
                                                                            key={m.id}/>);

    let incomingMessagesElement = props.dialogsPage.incomingMessagesData.map(m => <IncomingMessage id={m.id}
                                                                                                   message={m.message}
                                                                                                   avatar={m.avatar}
                                                                                                   key={m.id}/>);

    let newMessageText = props.dialogsPage.newMessageText;

    let onMessageAddition = () => {
        props.addMessage();
    };

    let onMessageChange = (e) => {
        let message = e.target.value;
        props.updateNewMessageText(message);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>

                <div>
                    <div>
                        <textarea value={newMessageText}
                                  onChange={onMessageChange}
                                  placeholder='Enter your message'>
                        </textarea>
                    </div>

                    <div>
                        <button onClick={onMessageAddition}>Add message</button>
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