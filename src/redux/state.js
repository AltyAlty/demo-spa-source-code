const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let store = {

    _state: {
        profilePage: {
            postsData: [
                {
                    id: 1,
                    message: 'Hi, how are you?',
                    likesCount: 2
                },
                {
                    id: 2,
                    message: 'It\'s my first post',
                    likesCount: 3
                }
            ],

            newPostText: 'kamasutra'
        },

        dialogsPage: {
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
        },

        sidebar: {
            friendsData: [
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
                }
            ]
        }
    },
    _callSubscriber() {

    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        }
        else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);

        }
        else if (action.type === ADD_MESSAGE) {
            let newMessage = {
                id: 6,
                message: this._state.dialogsPage.newMessageText,
                avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
            };
            this._state.dialogsPage.messagesData.push(newMessage);
            this._state.dialogsPage.newMessageText = '';
            this._callSubscriber(this._state);
        }
        else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newMessage;
            this._callSubscriber(this._state);
        }
    }
};

export const addPostActionCreator = () => ({
    type: ADD_POST
});

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
});

export const addMessageActionCreator = () => ({
    type: ADD_MESSAGE
});

export const updateNewMessageTextActionCreator = (message) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessage: message
});

export default store;

window.store = store;