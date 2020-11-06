import avatarSource from '../assets/images/user.png';

// constants for types of actions
const ADD_MESSAGE = 'react-samurai-01/dialogs-reducer/ADD-MESSAGE';

// type of state
type InitialStateType = typeof initialState;

type DialogType = {
    id: number
    name: string
    avatar: typeof avatarSource
};

type MessageType = {
    id: number
    message: string
    avatar: typeof avatarSource
};

type IncomingMessageType = {
    id: number
    message: string
    avatar: typeof avatarSource
};

// state
let initialState = {
    dialogs: [
        {id: 1, name: 'Abba', avatar: avatarSource},
        {id: 2, name: 'Bret', avatar: avatarSource},
        {id: 3, name: 'Carry', avatar: avatarSource},
        {id: 4, name: 'Daemon', avatar: avatarSource},
        {id: 5, name: 'Eric', avatar: avatarSource},
        {id: 6, name: 'Frye', avatar: avatarSource}
    ] as Array<DialogType>,

    messagesData: [
        {id: 1, message: 'Hi', avatar: avatarSource},
        {id: 2, message: '..', avatar: ''},
        {id: 3, message: 'Fine', avatar: avatarSource},
        {id: 4, message: 'You?', avatar: avatarSource}
    ] as Array<MessageType>,

    incomingMessagesData: [
        {id: 1, message: '..', avatar: ''},
        {id: 2, message: 'How are you?', avatar: avatarSource},
        {id: 3, message: '..', avatar: ''},
        {id: 4, message: '..', avatar: ''},
        {id: 5, message: 'OK', avatar: avatarSource}
    ] as Array<IncomingMessageType>
};

// reducer
const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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
};

// types of action objects
type AddMessageActionCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
};

// action creators
export const addMessageActionCreator = (newMessageText: string): AddMessageActionCreatorActionType => ({
    type: ADD_MESSAGE,
    newMessageText
});

// export
export default dialogsReducer;