import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";

function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader/>
    };

    return (
        <div>
            <div className={s.profileImage}>
                <img src='https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg' alt=""/>
            </div>

            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                Avatar and Description
            </div>
        </div>
    );
};

export default ProfileInfo;