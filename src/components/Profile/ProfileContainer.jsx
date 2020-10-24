import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getUserProfile, getUserStatus, saveProfile, saveUserPhoto, updateUserStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userID = this.props.match.params.userID;

        if (!userID) {
            userID = this.props.authUserID;
            if (!userID) {
                this.props.history.push("/login/")
            }
        }

        this.props.getUserProfile(userID);
        this.props.getUserStatus(userID);
    };

    componentDidMount() {
        this.refreshProfile();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            this.refreshProfile();
        }
    };

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userID}
                     saveUserPhoto={this.props.saveUserPhoto}
            />
        )
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserID: state.auth.id,
    isAuth: state.auth.isAuth,
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, saveUserPhoto, saveProfile}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer);