import avatarSource from '../assets/images/user.png';

// constants for types of actions
const ADD_MESSAGE = 'react-samurai-01/dialogs-reducer/ADD-MESSAGE';

// state
let initialState = {
    dialogs: [
        {id: 1, name: 'Abba', avatar: avatarSource},
        {id: 2, name: 'Bret', avatar: avatarSource},
        {id: 3, name: 'Carry', avatar: avatarSource},
        {id: 4, name: 'Daemon', avatar: avatarSource},
        {id: 5, name: 'Eric', avatar: avatarSource},
        {id: 6, name: 'Frye', avatar: avatarSource}
    ],

    messagesData: [
        {id: 1, message: 'Hi', avatar: avatarSource},
        {id: 2, message: '..', avatar: ''},
        {id: 3, message: 'Fine', avatar: avatarSource},
        {id: 4, message: 'You?', avatar: avatarSource}
    ],

    incomingMessagesData: [
        {id: 1, message: '..', avatar: ''},
        {id: 2, message: 'How are you?', avatar: avatarSource},
        {id: 3, message: '..', avatar: ''},
        {id: 4, message: '..', avatar: ''},
        {id: 5, message: 'OK', avatar: avatarSource}
    ]
};

// reducer
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: action.newMessageText,
                avatar: avatarSource
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };

        default:
            return state;
    }
}

// action creators
export const addMessageActionCreator = (newMessageText) => ({
    type: ADD_MESSAGE,
    newMessageText
});

// export
export default dialogsReducer;