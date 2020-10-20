import React from 'react';
import {
    setCurrentPage,
    requestUsers,
    follow,
    unfollow
} from '../../redux/users-reducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    isFollowingInProgress,
    getUsers,
    getPortionSize
} from '../../redux/users-selectors';

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    };

    onPageChange = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, pageSize);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChange={this.onPageChange}
                   users={this.props.users}
                   isFollowingInProgress={this.props.isFollowingInProgress}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   portionSize={this.props.portionSize}
            />
        </>
    }
};

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: isFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
};

export default compose(
    connect(mapStateToProps, {
        setCurrentPage,
        requestUsers,
        follow,
        unfollow
    }),
    //withAuthRedirect
)(UsersContainer);