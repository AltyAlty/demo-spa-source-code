import React from 'react';
import {createField, Input, Textarea} from '../../common/FormsControls/FormsControls';
import {reduxForm} from 'redux-form';
import s from './ProfileInfo.module.css';
import style from '../../common/FormsControls/FormsControls.module.css';


function ProfileDataForm({handleSubmit, profile, error}) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>

            {error && <div className={style.formSummaryError}>{error}</div>}

            <div>
                <b>1. Full Name</b>:
                {createField("Full Name", "fullName", Input, [])}
            </div>

            <div>
                <b>2. About Me</b>:
                {createField("About Me", "aboutMe", Input, [])}
            </div>

            <div>
                <b>3. Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return (
                    <div key={key} className={s.contact}>
                        <b>{key}: {createField(key, "contacts." + key, Input, [])}</b>
                    </div>
                )
            })}
            </div>

            <div>
                <b>4. Is looking for a job?</b>
                {createField("", "lookingForAJob", Input, [], {type: "checkbox"})}
            </div>

            <div>
                <b>Which one?</b>
                {createField("Which one?", "lookingForAJobDescription", Textarea, [])}
            </div>
        </form>
    )
};

const ProfileDataFormReduxForm = reduxForm({
    form: 'editProfile'
})(ProfileDataForm);

export default ProfileDataFormReduxForm;