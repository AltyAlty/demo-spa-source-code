import React, {useState} from 'react';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    };

    const onUserStatusChange = (e) => {
        setStatus(e.currentTarget.value)

    };

    const handleFocus = (e) => {
        e.target.select();
    };

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "enter status"}</span>
                </div>
            }
            {editMode &&
            <div>
                <input onChange={onUserStatusChange}
                       onFocus={handleFocus}
                       autoFocus={true}
                       onBlur={deactivateEditMode}
                       value={status}/>
            </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;