import React from 'react';
import './Header.scss';
import MediaQuery from 'react-responsive';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUser
} from '@fortawesome/free-solid-svg-icons';

const getUserView = (props) => {
    const username = props.user.user.username;
    return (
        <div className={'header__user'}>
            <FontAwesomeIcon icon={faUser} />
            <span className={'header__username'}>{username}</span>
            <span
                className={'header__logout-link'}
                onClick={()=>{props.logout()}}
            >
                Выход
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
                Регистрация
            </span>
            <span
                className={'header__link-to-login'}
                onClick={()=>{props.goToLoginPage()}}
            >
                Вход
            </span>
        </div>
    );
}

const getMobileHeader = (props) => {
    return (
        <div className={'header-mobile'}>
            <div className={'header-mobile__inner'}>
                <span className={'header-mobile__title'}>MOEX</span>
            </div>
        </div>
    );
}

const getDesktopHeader = props => {
    return (
        <div className={'header'}>
            <div className={'header__inner'}>
                <div className={'header__left'}>
                    <span
                        className={'header__link-to-home'}
                        onClick={() => {props.goToHomePage()}}
                    >
                        На главную
                    </span>
                    <span
                        className={'header__link-to-allstocks'}
                        onClick={() => {props.goToAllStocksPage()}}
                    >
                        Все акции
                    </span>
                </div>
                <span className={'header__title'}>MOEX</span>
                <div className={'header__right'}>
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
        </div>
    );
}

const HeaderView = props => {
    return (
        <div>
            <MediaQuery maxWidth={767}>
                {getMobileHeader(props)}
            </MediaQuery>
            <MediaQuery minWidth={768}>
                {getDesktopHeader(props)}
            </MediaQuery>
        </div>
    );
}

export default HeaderView;
