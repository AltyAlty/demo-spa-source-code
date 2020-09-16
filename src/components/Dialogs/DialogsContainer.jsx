import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

function DialogsContainer() {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().dialogsPage;

                    let addMessage = () => {
                        store.dispatch(addMessageActionCreator());
                    };

                    let updateNewMessageText = (message) => {
                        store.dispatch(updateNewMessageTextActionCreator(message));
                    };

                    return (
                        <Dialogs updateNewMessageText={updateNewMessageText}
                                 addMessage={addMessage}
                                 dialogsPage={state}/>
                    )
                }
            }
        </StoreContext.Consumer>
    );
}

export default DialogsContainer;