const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        {
            id: 1,
            name: 'Abba',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 2,
            name: 'Bret',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 3,
            name: 'Carry',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 4,
            name: 'Daemon',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 5,
            name: 'Eric',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 6,
            name: 'Frye',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        }
    ],

    messagesData: [
        {
            id: 1,
            message: 'Hi',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {id: 2, message: '..', avatar: ''},
        {
            id: 3,
            message: 'Fuck off',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 4,
            message: 'Bitch',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        }
    ],

    incomingMessagesData: [
        {id: 1, message: '..', avatar: ''},
        {
            id: 2,
            message: 'How are you?',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {id: 3, message: '..', avatar: ''},
        {id: 4, message: '..', avatar: ''},
        {
            id: 5,
            message: 'OK',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        }
    ],

    newMessageText: 'kamasutra'
}

const dialogsReducer = (state = initialState, action) => {
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