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
import {UserType} from '../../types/types';
import {AppStateType} from '../../redux/redux-store';

// types for props
type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    portionSize: number
    isFollowingInProgress: Array<number> // array of users IDs
};

type MapDispatchToPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
};

type OwnPropsType = {
    pageTitle: string
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

// component
class UsersContainer extends React.Component<PropsType/*, StateType*/> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    };

    onPageChange = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, pageSize);
    };

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>

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

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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
    // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        setCurrentPage,
        requestUsers,
        follow,
        unfollow
    }),
    //withAuthRedirect
)(UsersContainer);