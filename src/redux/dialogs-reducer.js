const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageText,
                avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
            };
            state.messagesData.push(newMessage);
            state.newMessageText = '';
            return state;

        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessage;
            return state;

        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({
    type: ADD_MESSAGE
});

export const updateNewMessageTextActionCreator = (message) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessage: message
});

export default dialogsReducer;