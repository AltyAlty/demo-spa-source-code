import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

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
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
};

export default store;

window.store = store;