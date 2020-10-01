import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID;

        if (!userID) {
            userID = 2
        };

        this.props.getUserProfile(userID);
    };

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);