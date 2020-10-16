import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

function ProfileInfo({profile, status, updateUserStatus}) {
    if (!profile) {
        return <Preloader/>
    };

    return (
        <div>
            <div className={s.profileImage}>
                <img src='https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg' alt=""/>
            </div>

            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} alt=""/>

                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>

                <div>
                    1. About Me: {profile.aboutMe}
                </div>

                <div>
                    <div>
                        2. Contacts:
                    </div>
                    <div>
                        2.1 Facebook: {profile.contacts.facebook}
                    </div>
                    <div>
                        2.2 Website: {profile.contacts.website}
                    </div>
                    <div>
                        2.3 VK: {profile.contacts.vk}
                    </div>
                    <div>
                        2.4 Twitter: {profile.contacts.twitter}
                    </div>
                    <div>
                        2.5 Instagram: {profile.contacts.instagram}
                    </div>
                    <div>
                        2.6 YouTube: {profile.contacts.youtube}
                    </div>
                    <div>
                        2.7 GitHub: {profile.contacts.github}
                    </div>
                    <div>
                        2.8 mainLink: {profile.contacts.mainLink}
                    </div>
                </div>

                <div>
                    3. Is looking for a job? {profile.lookingForAJob === true ? <span>Yes</span> : <span>No</span>}
                </div>

                <div>
                    4. Which one? {profile.lookingForAJobDescription}
                </div>

                <div>
                    5. Full Name: {profile.fullName}
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;