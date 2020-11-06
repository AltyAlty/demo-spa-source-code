import {authAPI, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

// constants for types of actions
const SET_USER_DATA = 'react-samurai-01/auth-reducer/SET-USER-DATA';
const SET_CAPTCHA_URL = 'react-samurai-01/auth-reducer/SET-CAPTCHA-URL';

// type of state
/*export type InitialStateType2 = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaURL: string | null
};*/

type InitialStateType = typeof initialState;

// state
let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
};

// reducer
const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

// types of action objects
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
};

type SetAuthUserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};

type SetCaptchaURLActionType = {
    type: typeof SET_CAPTCHA_URL,
    payload: { captchaURL: string }
};

// action creators
const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {
        id,
        email,
        login,
        isAuth
    }
});

const setCaptchaURL = (captchaURL: string): SetCaptchaURLActionType => ({
    type: SET_CAPTCHA_URL,
    payload: {
        captchaURL
    }
});

// thunk creators
export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURL());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'unknown error'
        dispatch(stopSubmit('login', {_error: message}));
    }
};

const getCaptchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaURL = response.data.url;

    dispatch(setCaptchaURL(captchaURL));
};

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

// export
export default authReducer;