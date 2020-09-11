import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
    return (
        <div className={s.profile}>
            <ProfileInfo/>

            <MyPosts posts={props.profilePage.posts} newPostText={props.profilePage.newPostText} updateNewPostText={props.updateNewPostText} addPost={props.addPost}/>
        </div>
    );
}

export default Profile;