import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

function Profile(props) {
    return (
        <div className={s.profile}>
            <ProfileInfo profile={props.profile}/>

            <MyPostsContainer/>
        </div>
    );
}

export default Profile;