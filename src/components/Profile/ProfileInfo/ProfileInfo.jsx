import React from 'react';
import s from './ProfileInfo.module.css';

function ProfileInfo() {
    return (
        <div>
            <div className={s.profileImage}>
                <img src='https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg' alt=""/>
            </div>

            <div className={s.descriptionBlock}>
                Avatar and Description
                <img src='' alt=""/>
            </div>
        </div>
    );
}

export default ProfileInfo;