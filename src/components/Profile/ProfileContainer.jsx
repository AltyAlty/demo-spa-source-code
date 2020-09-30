import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';

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


let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

let WithURLDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);