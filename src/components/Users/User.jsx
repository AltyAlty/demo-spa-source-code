import React from 'react';
import styles from './User.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from 'react-router-dom';

function User({user, isFollowingInProgress, unfollow, follow}) {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             alt="" className={styles.userPhoto}/>
                    </NavLink>
                </div>

                <div>
                    {user.followed
                        ? <button disabled={isFollowingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id);
                                  }}>Unfollow</button>

                        : <button disabled={isFollowingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id);
                                  }}>Follow</button>
                    }
                </div>
            </span>

            <span>
                <span>
                    <div>{user.id}</div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>
    )
};

export default User;