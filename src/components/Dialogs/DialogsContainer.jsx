import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator());
        },

        updateNewMessageText: (message) => {
            dispatch(updateNewMessageTextActionCreator(message));
        },
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;