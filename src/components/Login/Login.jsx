import React from 'react';
import s from './Login.module.css';
import style from '../common/FormsControls/FormsControls.module.css';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../utils/validators/validators';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';

const maxLength30 = maxLengthCreator(30);

function LoginForm({handleSubmit, error}) {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", Input, [required, maxLength30])}
            {createField("Password", "password", Input, [required, maxLength30], {type: "password"})}
            {createField(null, "rememberMe", Input, null, {type: "checkbox"}, "Remember me?")}

            {error && <div className={style.formSummaryError}>{error}</div>}

            <div>
                <button>Log in</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

function Login(props) {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    if (props.isAuth) {
        return <Redirect to={'/profile/'}/>
    }

    return (
        <div>
            <h1>Log in</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);