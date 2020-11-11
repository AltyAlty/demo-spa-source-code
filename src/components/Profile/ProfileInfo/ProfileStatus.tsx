import React, {ChangeEvent} from 'react';

// types for props
type PropsType = {
    status: string
    updateUserStatus: (newStatus: string) => void
};

// types for local state
type StateType = {
    editMode: boolean
    status: string
};

// component
class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
            status: this.props.status
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    };

    handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.select();
    };

    onUserStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: event.currentTarget.value
        });
    };

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    };

    render() {
        return (
            <>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || 'enter status' }</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onUserStatusChange}
                           onFocus={this.handleFocus}
                           autoFocus={true}
                           onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>
                }
            </>
        );
    };
};

export default ProfileStatus;