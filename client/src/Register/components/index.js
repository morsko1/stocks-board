import React from 'react';
import './index.scss';

const getUserNameInput = (props) => {
    return (
        <div className={'register-container__username'}>
            <label htmlFor={'register-container__username-input'}>username</label>
            <input
                id={'register-container__username-input'}
                type={'text'}
                data-field={'username'}
                value={props.input.username}
                onChange={(e) => {props.handleInput(e.target.dataset.field, e.target.value)}}
                required
            />
        </div>
    );
}
const getEmailInput = (props) => {
    return (
        <div className={'register-container__email'}>
            <label htmlFor={'register-container__email-input'}>email</label>
            <input
                id={'register-container__email-input'}
                type={'email'}
                data-field={'email'}
                value={props.input.email}
                onChange={(e) => {props.handleInput(e.target.dataset.field, e.target.value)}}
                required
            />
        </div>
    );
}

const getPasswordInput = (props) => {
    return (
        <div className={'register-container__password'}>
            <label htmlFor={'register-container__password-input'}>password</label>
            <input
                id={'register-container__password-input'}
                type={'password'}
                data-field={'password'}
                value={props.input.password}
                onChange={(e) => {props.handleInput(e.target.dataset.field, e.target.value)}}
                required
            />
        </div>
    );
}
const getPasswordConfirmInput = (props) => {
    return (
        <div className={'register-container__password-confirm'}>
            <label htmlFor={'register-container__password-confirm-input'}>confirm password</label>
            <input
                id={'register-container__password-confirm-input'}
                type={'password'}
                data-field={'confirm'}
                value={props.input.confirm}
                onChange={(e) => {props.handleInput(e.target.dataset.field, e.target.value)}}
                required
            />
        </div>
    );
}
const getRegisterButton = (props) => {
    return (
        <div className={'register-container__submit-button-wrapper'}>
            <button
                type={'submit'}
                className={'register-container__submit-button'}
            >
                register
            </button>
        </div>
    );
}
const getNavigationLinks = (props) => {
    return (
        <div>
            <div className={'register-container__link-to-login-wrapper'}>
                or
                <span
                    className={'register-container__link-to-login'}
                    onClick={()=>{props.goToLoginPage()}}
                >
                    login
                </span>
            </div>
            <div className={'register-container__link-to-home-wrapper'}>
                <span
                    className={'register-container__link-to-home'}
                    onClick={()=>{props.goToHomePage()}}
                >
                    home
                </span>
            </div>
        </div>
    );
}
const getRegisterContainer = (props) => {
    return (
        <div className={'register-container__inner'}>
            <div className={'register-container__title'}>Register</div>
            <form
                id={'register-container__form'}
                className={'register-container__form'}
                onSubmit={(e) => {
                    e.preventDefault();
                    props.register();
                }}
            >
                {getUserNameInput(props)}
                {getEmailInput(props)}
                {getPasswordInput(props)}
                {getPasswordConfirmInput(props)}
                {getRegisterButton(props)}
                {getNavigationLinks(props)}
            </form>
        </div>
    );
}

const RegisterView = props => {
    return (
        <div className={'register-container'}>
            {
                props.registerError ?
                    <div className="register-container__error">{props.registerError.error}</div> :
                    null
            }
            {
                props.isFetching ?
                    <div className="register-container__loader" /> :
                    getRegisterContainer(props)
            }
        </div>
    );
}

export default RegisterView;
