import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getUserProfile, getUserStatus, updateUserStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID;

        if (!userID) {
            userID = 11674
        };

        this.props.getUserProfile(userID);
        this.props.getUserStatus(userID);
    };

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserID: state.auth.userID,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);