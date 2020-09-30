import {authAPI, usersAPI} from "../api/api";
import {setUserProfile} from "./profile-reducer";

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };

        default:
            return state;
    }
};

export const setAuthUserData = (id, email, login) => ({
    type: SET_USER_DATA,
    data: {
        id,
        email,
        login
    }
});


export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me()
            .then(data => {
                if (data.data.resultCode === 0) {
                    let {id, email, login} = data.data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            });
    }
};

export default authReducer;