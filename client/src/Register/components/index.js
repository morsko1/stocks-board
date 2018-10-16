import React from 'react';
import './index.css';

const RegisterView = props => {
    return (
        <div className={'register-container'}>
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
                    <div className={'register-container__submit-button-wrapper'}>
                        <button
                            type={'submit'}
                            className={'register-container__submit-button'}
                        >
                            register
                        </button>
                    </div>
                    <div className={'register-container__link-to-login-wrapper'}>
                        or
                        <span
                            className={'register-container__link-to-login'}
                            onClick={()=>{props.goToLoginPage()}}
                        >
                            login
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterView;
