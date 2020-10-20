import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/helpers/object-helpers';

// constants for types of actions
const FOLLOW = 'react-samurai-01/users-reducer/FOLLOW';
const UNFOLLOW = 'react-samurai-01/users-reducer/UNFOLLOW';
const SET_USERS = 'react-samurai-01/users-reducer/SET-USERS';
const SET_CURRENT_PAGE = 'react-samurai-01/users-reducer/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'react-samurai-01/users-reducer/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'react-samurai-01/users-reducer/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'react-samurai-01/users-reducer/TOGGLE-IS-FOLLOWING-IN-PROGRESS';

// state
let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [],
    portionSize: 20
};

// reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
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

// action creators
export const followSuccess = (userID) => ({
    type: FOLLOW,
    userID
});

export const unfollowSuccess = (userID) => ({
    type: UNFOLLOW,
    userID
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
});

export const setTotalUsersCount = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
});

export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

export const toggleIsFollowingInProgress = (isFollowingInProgress, userID) => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFollowingInProgress,
    userID
});

// thunk creators
export const requestUsers = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    const response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
};

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingInProgress(true, id));

    const response = await apiMethod(id);

    if (response.resultCode === 0) {
        dispatch(actionCreator(id))
    }

    dispatch(toggleIsFollowingInProgress(false, id));
}

export const unfollow = (id) => async (dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};

export const follow = (id) => async (dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), followSuccess);
};

// export
export default usersReducer;