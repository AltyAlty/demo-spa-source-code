import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataFormReduxForm from './ProfileDataForm';

function ProfileInfo({isOwner, profile, status, updateUserStatus, saveUserPhoto, saveProfile}) {
    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    };

    if (!profile) {
        return <Preloader/>
    }

    const onUserPhotoSelected = (e) => {
        if (e.target.files.length) {
            saveUserPhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    };

    return (
        <div>
            <div className={s.profileImage}>
                <img src='https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg' alt=""/>
            </div>

            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.userPhoto} alt=""/>

                {isOwner && <input type={"file"} onChange={onUserPhotoSelected}/>}

                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>

                {editMode
                    ? <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
                    : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={activateEditMode}/>
                }
            </div>
        </div>
    );
};

function ProfileData({profile, isOwner, activateEditMode}) {
    return (
        <div>
            {isOwner && <div>
                <button onClick={activateEditMode}>edit</button>
            </div>}

            <div><b>1. Full Name</b>: {profile.fullName}</div>

            <div><b>2. About Me</b>: {profile.aboutMe}</div>

            <div>
                <b>3. Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key}
                                contactTitle={key}
                                contactValue={profile.contacts[key]}
                />
            })}
            </div>

            <div><b>4. Is looking for a job?</b> {profile.lookingForAJob ? <span>Yes</span> : <span>No</span>}</div>

            {profile.lookingForAJob && <div><b>Which one?</b> {profile.lookingForAJobDescription}</div>}
        </div>
    )
};

function Contact({contactTitle, contactValue}) {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
};


export default ProfileInfo;