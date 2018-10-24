import React from 'react';
import './Header.css';

const getUserView = (props) => {
    const username = props.user.user.username;
    return (
        <div className={'header__user'}>
            <span className={'header__username'}>{username}</span>
            <span
                className={'header__logout-link'}
                onClick={()=>{props.logout()}}
            >
                logout
            </span>
        </div>
    );
}

const getAuthView = (props) => {
    return (
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
    );
}

const HeaderView = props => {
    return (
        <div className={'header'}>
            <div className={'header__inner'}>
                <span className={'header__title'}>MOEX</span>
                {
                    props.user.isFetching ?
                        null :
                        (
                            props.user.user && props.user.user.username ?
                                getUserView(props) :
                                getAuthView(props)
                        )
                }
            </div>
        </div>
    );
}

export default HeaderView;
