import React from 'react';
import './index.css';

const RegisterView = props => {
    return (
        <div className={'register-container'}>
            <div className={'register-container__inner'}>
                <div className={'register-container__title'}>Register</div>
                <form className={'register-container__form'} onSubmit={(e) => {e.preventDefault()}}>
                    <div className={'register-container__username'}>
                        <label htmlFor={'register-container__username-input'}>username</label>
                        <input
                            id={'register-container__username-input'}
                            type={'text'}
                        />
                    </div>
                    <div className={'register-container__email'}>
                        <label htmlFor={'register-container__email-input'}>email</label>
                        <input
                            id={'register-container__email-input'}
                            type={'text'}
                        />
                    </div>
                    <div className={'register-container__password'}>
                        <label htmlFor={'register-container__password-input'}>password</label>
                        <input
                            id={'register-container__password-input'}
                            type={'password'}
                        />
                    </div>
                    <div className={'register-container__password-confirm'}>
                        <label htmlFor={'register-container__password-confirm-input'}>confirm password</label>
                        <input
                            id={'register-container__password-confirm-input'}
                            type={'password'}
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
                </form>
            </div>
        </div>
    );
}

export default RegisterView;
