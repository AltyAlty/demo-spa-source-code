import {getAuthUserData} from './auth-reducer';

// constants for types of actions
const INITIALIZATION_SUCCESSFUL = 'react-samurai-01/app-reducer/INITIALIZATION-SUCCESSFUL';

// type of state
type InitialStateType = {
    initialized: boolean
};

// state
let initialState: InitialStateType = {
    initialized: false
};

// reducer
const appReducer = (state = initialState, action: any): InitialStateType => {
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

// types of action objects
type InitializingAppActionType = {
    type: typeof INITIALIZATION_SUCCESSFUL
};

// action creators
export const initializingApp = (): InitializingAppActionType => ({
    type: INITIALIZATION_SUCCESSFUL
});

// thunk creators
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(initializingApp());
        });
};

// export
export default appReducer;