import {profileAPI, usersAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';

let initialState = {
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

    newPostText: 'kamasutra',

    profile: null,

    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: '',
                postsData: [...state.postsData, newPost]
            };

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            };

        default:
            return state;
    }
};

export const addPostActionCreator = () => ({
    type: ADD_POST
});

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
});

export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status: status
});


export const getUserProfile = (userID) => {
    return (dispatch) => {
        usersAPI.getUserProfile(userID).then(data => {
            dispatch(setUserProfile(data.data));
        });
    }
};

export const getUserStatus = (userID) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userID).then(data => {
            dispatch(setUserStatus(data.data));
        });
    }
};

export const updateUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status).then(data => {
            if (data.data.resultCode === 0) {
                dispatch(setUserStatus(status));
            }
        });
    }
};

export default profileReducer;