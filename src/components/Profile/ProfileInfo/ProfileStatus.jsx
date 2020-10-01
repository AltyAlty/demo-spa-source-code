import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    };

    activateEditMode() {
        //console.log(this.state.editMode);

        this.setState({
            editMode: true
        });

        //console.log(this.state.editMode);
    };

    deactivateEditMode() {
        this.setState({
            editMode: false
        });
    };

    render() {
        return (
            <>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
                </div>
                }
            </>
        );
    };
};

export default ProfileStatus;