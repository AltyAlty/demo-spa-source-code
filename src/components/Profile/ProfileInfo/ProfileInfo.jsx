import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';

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
                <img src={props.profile.photos.large} alt=""/>

                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>

                <div>
                    1. About Me: {props.profile.aboutMe}
                </div>

                <div>
                    <div>
                        2. Contacts:
                    </div>
                    <div>
                        2.1 Facebook: {props.profile.contacts.facebook}
                    </div>
                    <div>
                        2.2 Website: {props.profile.contacts.website}
                    </div>
                    <div>
                        2.3 VK: {props.profile.contacts.vk}
                    </div>
                    <div>
                        2.4 Twitter: {props.profile.contacts.twitter}
                    </div>
                    <div>
                        2.5 Instagram: {props.profile.contacts.instagram}
                    </div>
                    <div>
                        2.6 YouTube: {props.profile.contacts.youtube}
                    </div>
                    <div>
                        2.7 GitHub: {props.profile.contacts.github}
                    </div>
                    <div>
                        2.8 mainLink: {props.profile.contacts.mainLink}
                    </div>
                </div>

                <div>
                    3. Is looking for a job? {props.profile.lookingForAJob === true ? <span>Yes</span> : <span>No</span>}
                </div>

                <div>
                    4. Which one? {props.profile.lookingForAJobDescription}
                </div>

                <div>
                    5. Full Name: {props.profile.fullName}
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;