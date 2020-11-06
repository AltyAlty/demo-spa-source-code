import {profileAPI, usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {PhotosType, PostType, ProfileType} from '../types/types';

// constants for types of actions
const ADD_POST = 'react-samurai-01/profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'react-samurai-01/profile-reducer/SET-USER-PROFILE';
const SET_USER_STATUS = 'react-samurai-01/profile-reducer/SET-USER-STATUS';
const DELETE_POST = 'react-samurai-01/profile-reducer/DELETE-POST';
const IS_SAVING_USER_PHOTO_SUCCESSFUL = 'react-samurai-01/profile-reducer/IS-SAVING-USER-PHOTO-SUCCESSFUL';

// type of state
type InitialStateType = typeof initialState;

// state
let initialState = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 2},
        {id: 2, message: 'It\'s my first post', likesCount: 3}
    ] as Array<PostType>,

    profile: null as ProfileType | null,

    status: ''
};

// reducer
const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                postsData: state.postsData.filter(p => p.id !== action.postID)
            };

        case IS_SAVING_USER_PHOTO_SUCCESSFUL:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };

        default:
            return state;
    }
};

// types of action objects
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
};

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
};

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
};

type DeletePostActionCreatorActionType = {
    type: typeof DELETE_POST
    postID: number
};

type IsSavingUserPhotoSuccessfulACActionType = {
    type: typeof IS_SAVING_USER_PHOTO_SUCCESSFUL
    photos: PhotosType
};

// action creators
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({
    type: ADD_POST,
    newPostText
});

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
});

export const setUserStatus = (status: string): SetUserStatusActionType => ({
    type: SET_USER_STATUS,
    status
});

export const deletePostActionCreator = (postID: number): DeletePostActionCreatorActionType => ({
    type: DELETE_POST,
    postID
});

export const isSavingUserPhotoSuccessfulAC = (photos: PhotosType): IsSavingUserPhotoSuccessfulACActionType => ({
    type: IS_SAVING_USER_PHOTO_SUCCESSFUL,
    photos
});

// thunk creators
export const getUserProfile = (userID: number) => async (dispatch: any) => {
    const response = await usersAPI.getUserProfile(userID);

    dispatch(setUserProfile(response.data));
};

export const getUserStatus = (userID: number) => async (dispatch: any) => {
    const response = await profileAPI.getUserStatus(userID);

    dispatch(setUserStatus(response.data));
};

/*old updateUserStatus TC without try catch*/
/*export const updateUserStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};*/

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    try {
        const response = await profileAPI.updateUserStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (error) {
        alert(error);
    }
};

export const saveUserPhoto = (photoFile: any) => async (dispatch: any) => {
    const response = await profileAPI.saveUserPhoto(photoFile);

    if (response.data.resultCode === 0) {
        dispatch(isSavingUserPhotoSuccessfulAC(response.data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userID = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userID));
    } else {
        dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};

// export
export default profileReducer;