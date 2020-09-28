import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from 'react-router-dom';

function Users(props) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };

    return (
        <div>
            <div>
                {pages.map(p => {
                        return (
                            <span className={props.currentPage === p ? styles.selectedPage : ''}
                                  onClick={() => {
                                      props.onPageChange(p)
                                  }}>
                            {p}
                        </span>
                        )
                    }
                )}
            </div>

            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 alt="" className={styles.userPhoto}/>
                        </NavLink>
                    </div>

                    <div>
                        {u.followed
                            ? <button disabled={props.isFollowingInProgress.some(id => id === u.id)}
                                      onClick={() => {
                                          props.unfollow(u.id);
                                      }}>Unfollow</button>

                            : <button disabled={props.isFollowingInProgress.some(id => id === u.id)}
                                      onClick={() => {
                                          props.follow(u.id);
                                      }}>Follow</button>
                        }
                    </div>
                </span>

                <span>
                    <span>
                        <div>{u.id}</div>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
            }
        </div>
    )
};

export default Users;