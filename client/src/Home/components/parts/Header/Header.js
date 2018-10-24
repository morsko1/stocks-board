import React from 'react';
import './Header.css';

const HeaderView = props => {
    return (
        <div className={'header'}>
            <div className={'header__inner'}>
                <span className={'header__title'}>MOEX</span>
                {
                    props.user && props.user.username ?
                        <div className={'header__user'}>
                            <span className={'header__username'}>{props.user.username}</span>
                            <span
                                className={'header__logout-link'}
                                onClick={()=>{props.logout()}}
                            >
                                logout
                            </span>
                        </div> :
                        <div className={'header__link-container'}>
                            <span
                                className={'header__link-to-register'}
                                onClick={()=>{props.goToRegisterPage()}}
                            >
                                register
                            </span>
                            <span
                                className={'header__link-to-login'}
                                onClick={()=>{props.goToLoginPage()}}
                            >
                                login
                            </span>
                        </div>
                }
            </div>
        </div>
    );
}

export default HeaderView;
