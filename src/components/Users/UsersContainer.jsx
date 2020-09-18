import React from 'react';
import {followAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";
import Users from "./Users";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(followAC(userID));
        },

        unfollow: (userID) => {
            dispatch(unfollowAC(userID));
        },

        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
    }
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;