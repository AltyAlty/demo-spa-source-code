import {usersAPI} from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE-IS-FOLLOWING-IN-PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
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


export const requestUsers = (currentPage, pageSize) => {
    return (dispatch) => {

        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
};

export const unfollow = (id) => {
    return (dispatch) => {

        dispatch(toggleIsFollowingInProgress(true, id));

        usersAPI.unfollow(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(id))
            }
            dispatch(toggleIsFollowingInProgress(false, id));
        });
    }
};

export const follow = (id) => {
    return (dispatch) => {

        dispatch(toggleIsFollowingInProgress(true, id));

        usersAPI.follow(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(id))
            }
            dispatch(toggleIsFollowingInProgress(false, id));
        });
    }
}

export default usersReducer;