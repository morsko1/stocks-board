import React from 'react';
import './index.scss';

const getUserNameInput = (props) => {
    return (
        <div className={'login-container__username'}>
            <label htmlFor={'login-container__username-input'}>username</label>
            <input
                id={'login-container__username-input'}
                type={'text'}
                data-field={'username'}
                value={props.input.username}
                onChange={(e) => {props.handleInput(e.target.dataset.field, e.target.value)}}
                required
            />
        </div>
    );
}

const getPasswordInput = (props) => {
    return (
        <div className={'login-container__password'}>
            <label htmlFor={'login-container__password-input'}>password</label>
            <input
                id={'login-container__password-input'}
                type={'password'}
                data-field={'password'}
                value={props.input.password}
                onChange={(e) => {props.handleInput(e.target.dataset.field, e.target.value)}}
                required
            />
        </div>
    );
}
const getNavigationLinks = (props) => {
    return (
        <div>
            <div className={'login-container__link-to-register-wrapper'}>
                or
                <span
                    className={'login-container__link-to-register'}
                    onClick={()=>{props.goToRegisterPage()}}
                >
                    register
                </span>
            </div>
            <div className={'login-container__link-to-home-wrapper'}>
                <span
                    className={'login-container__link-to-home'}
                    onClick={()=>{props.goToHomePage()}}
                >
                    home
                </span>
            </div>
        </div>
    );
}

const getLoginButton = (props) => {
    return (
        <div className={'login-container__submit-button-wrapper'}>
            <button
                type={'submit'}
                className={'login-container__submit-button'}
            >
                login
            </button>
        </div>
    );
}

const getLoginContainer = (props) => {
    return (
        <div className={'login-container__inner'}>
            <div className={'login-container__title'}>Login</div>
            <form
                id={'login-container__form'}
                className={'login-container__form'}
                onSubmit={(e) => {
                    e.preventDefault();
                    props.login();
                }}
            >
                {getUserNameInput(props)}
                {getPasswordInput(props)}
                {getLoginButton(props)}
                {getNavigationLinks(props)}
            </form>
        </div>
    );
}

const LoginView = props => {
    return (
        <div className={'login-container'}>
        {
            props.loginError ?
            <div className="login-container__error">{props.loginError.error}</div> :
            null
        }
        {
            props.isFetching ?
                <div className="login-container__loader" /> :
                getLoginContainer(props)
        }
        </div>
    );
}

export default LoginView;
