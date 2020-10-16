import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

function Users({users, ...props}) {
    return (
        <div>
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChange={props.onPageChange}
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