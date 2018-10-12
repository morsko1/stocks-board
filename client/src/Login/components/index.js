import React from 'react';
import './index.css';

const LoginView = props => {
    return (
        <div className={'login-container'}>
            <div className={'login-container__inner'}>
                <div className={'login-container__title'}>Login</div>
                <form className={'login-container__form'} onSubmit={(e) => {e.preventDefault()}}>
                    <div className={'login-container__username'}>
                        <label htmlFor={'login-container__username-input'}>username</label>
                        <input
                            id={'login-container__username-input'}
                            type={'text'}
                        />
                    </div>
                    <div className={'login-container__password'}>
                        <label htmlFor={'login-container__password-input'}>password</label>
                        <input
                            id={'login-container__password-input'}
                            type={'password'}
                        />
                    </div>
                    <div className={'login-container__submit-button-wrapper'}>
                        <button
                            type={'submit'}
                            className={'login-container__submit-button'}
                        >
                            login
                        </button>
                    </div>
                    <div className={'login-container__link-to-register-wrapper'}>
                        or
                        <span
                            className={'login-container__link-to-register'}
                            onClick={()=>{}}
                        >
                            register
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginView;
