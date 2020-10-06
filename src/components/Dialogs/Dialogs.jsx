import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import IncomingMessage from './IncomingMessage/IncomingMessage';
import {Field, reduxForm} from 'redux-form';

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

    let addNewMessage = (values) => {
        props.addMessage(values.newMessageText);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>

            <div className={s.incomingMessages}>{incomingMessagesElement}</div>
        </div>
    );
};

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"}
                       name={"newMessageText"}
                       placeholder={"Enter your message"}/>
            </div>

            <div>
                <button>Add message</button>
            </div>
        </form>
    )
};

const AddMessageReduxForm = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;