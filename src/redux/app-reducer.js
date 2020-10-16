import {getAuthUserData} from './auth-reducer';

// constants for types of actions
const INITIALIZATION_SUCCESSFUL = 'react-samurai-01/app-reducer/INITIALIZATION-SUCCESSFUL';

// state
let initialState = {
    initialized: false
};

// reducer
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

// action creators
export const initializingApp = () => ({type: INITIALIZATION_SUCCESSFUL});

// thunk creators
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(initializingApp());
        });
};

// export
export default appReducer;