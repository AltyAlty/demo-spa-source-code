import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';

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

let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);