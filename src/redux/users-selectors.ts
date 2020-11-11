import {createSelector} from 'reselect';
import {AppStateType} from './redux-store';

// selectors for Users Component
const getUsersPrimitive = (state: AppStateType) => {
    return state.usersPage.users
};

export const getUsers = createSelector (getUsersPrimitive, (users) => {
    return users.filter(u => true)
});

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
};

export const getPortionSize = (state: AppStateType) => {
    return state.usersPage.portionSize
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
};

export const isFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.isFollowingInProgress
};