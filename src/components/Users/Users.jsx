import React from 'react';
import styles from './Users.module.css';


function Users(props) {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                isFollowed: false,
                fullName: 'Abba',
                status: 'I am useless',
                location: {city: 'Minsk', country: 'Belarus'},
                avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
            },
            {
                id: 2,
                isFollowed: true,
                fullName: 'Bret',
                status: 'I am worthless',
                location: {city: 'Moscow', country: 'Russia'},
                avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
            },
            {
                id: 3,
                isFollowed: false,
                fullName: 'Carry',
                status: 'I am pointless',
                location: {city: 'Kiev', country: 'Ukraine'},
                avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
            }
        ])
    };

    return (
        <div>
            {props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.avatar} alt="" className={styles.userPhoto}/>
                        </div>

                        <div>
                            {u.isFollowed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>

                            <div>{u.status}</div>
                        </span>

                        <span>
                            <div>{u.location.country} </div>

                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
};

export default Users;