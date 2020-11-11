import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from '../../types/types';

// types for props
type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (p: number) => void
    portionSize: number
    users: Array<UserType>
    isFollowingInProgress: Array<number> // array of users IDs
    unfollow: (id: number) => void
    follow: (id: number) => void
};

// component
const Users: React.FC<PropsType> = ({users, ...props}) => {
    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChange={props.onPageChange}
                       portionSize={props.portionSize}
            />

            <div>
                {users.map(u => <User key={u.id}
                                      user={u}
                                      isFollowingInProgress={props.isFollowingInProgress}
                                      unfollow={props.unfollow}
                                      follow={props.follow}
                />)}
            </div>
        </div>
    )
};

export default Users;