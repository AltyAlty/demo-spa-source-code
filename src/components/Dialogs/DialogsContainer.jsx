import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

function DialogsContainer(props) {
    let state = props.store.getState();

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    };

    let updateNewMessageText = (message) => {
        props.store.dispatch(updateNewMessageTextActionCreator(message));
    };

    return (
        <Dialogs updateNewMessageText={updateNewMessageText}
                 addMessage={addMessage}
                 dialogsPage={state.dialogsPage}/>
    );
}

export default DialogsContainer;