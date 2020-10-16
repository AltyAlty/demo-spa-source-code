import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

// constants for types of actions
const SET_USER_DATA = 'react-samurai-01/auth-reducer/SET-USER-DATA';

// state
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

// reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

// action creators
export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {
        id,
        email,
        login,
        isAuth
    }
});

// thunk creators
export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "unknown error"
        dispatch(stopSubmit("login", {_error: message}));
    }
};

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

// export
export default authReducer;