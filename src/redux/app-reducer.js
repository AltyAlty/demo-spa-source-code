import {getAuthUserData} from './auth-reducer';

const INITIALIZATION_SUCCESSFUL = 'INITIALIZATION-SUCCESSFUL';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZATION_SUCCESSFUL:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};

export const initializingApp = () => ({type: INITIALIZATION_SUCCESSFUL});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializingApp());
        });
};

export default appReducer;