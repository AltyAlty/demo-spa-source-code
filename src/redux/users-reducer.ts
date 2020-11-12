import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/helpers/object-helpers';
import {PhotosType, ProfileType, UserType} from '../types/types';
import {Dispatch} from 'redux';
import {AppStateType} from './redux-store';
import {ThunkAction} from "redux-thunk";

// constants for types of actions
const FOLLOW = 'react-samurai-01/users-reducer/FOLLOW';
const UNFOLLOW = 'react-samurai-01/users-reducer/UNFOLLOW';
const SET_USERS = 'react-samurai-01/users-reducer/SET-USERS';
const SET_CURRENT_PAGE = 'react-samurai-01/users-reducer/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'react-samurai-01/users-reducer/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'react-samurai-01/users-reducer/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'react-samurai-01/users-reducer/TOGGLE-IS-FOLLOWING-IN-PROGRESS';

// type of state
type InitialStateType = typeof initialState;

// state
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [] as Array<number>, // array of users IDs
    portionSize: 20
};

// reducer
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            };

        case SET_USERS:
            return {
                ...state,
                users: action.users
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress
                    ? [...state.isFollowingInProgress, action.userID]
                    : state.isFollowingInProgress.filter(id => id !== action.userID)
            };

        default:
            return state;
    }
};

// types of action objects
type ActionsType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
    SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType |
    ToggleIsFollowingInProgressActionType;

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userID: number
};

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userID: number
};

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
};

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
};

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
};

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
};

type ToggleIsFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS
    isFollowingInProgress: boolean
    userID: number
};

// action creators
export const followSuccess = (userID: number): FollowSuccessActionType => ({
    type: FOLLOW,
    userID
});

export const unfollowSuccess = (userID: number): UnfollowSuccessActionType => ({
    type: UNFOLLOW,
    userID
});

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users
});

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
});

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
});

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

export const toggleIsFollowingInProgress = (isFollowingInProgress: boolean, userID: number): ToggleIsFollowingInProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFollowingInProgress,
    userID
});


// types for thunks
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

// thunk creators
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    const response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
};

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   id: number,
                                   apiMethod: any,
                                   actionCreator: (id: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleIsFollowingInProgress(true, id));

    const response = await apiMethod(id);

    if (response.resultCode === 0) {
        dispatch(actionCreator(id))
    }

    dispatch(toggleIsFollowingInProgress(false, id));
}

export const unfollow = (id: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};

export const follow = (id: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), followSuccess);
};

// export
export default usersReducer;