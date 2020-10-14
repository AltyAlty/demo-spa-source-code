import {profileAPI, usersAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';
const DELETE_POST = 'DELETE-POST';

let initialState = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 2},
        {id: 2, message: 'It\'s my first post', likesCount: 3}
    ],

    profile: null,

    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost]
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

        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postID)
            };

        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText: newPostText
});

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});

export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status: status
});

export const deletePostActionCreator = (postID) => ({
    type: DELETE_POST,
    postID: postID
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