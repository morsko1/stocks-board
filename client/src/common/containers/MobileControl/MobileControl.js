import React from 'react';
import './MobileControl.scss';
import OutsideClick from '~/common/components/OutsideClick/OutsideClick.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faBars
} from '@fortawesome/free-solid-svg-icons';

const getUserView = (props) => {
    const username = props.user.user.username;
    return (
        <div className={'mobile-control__user'}>
            <div className={'mobile-control__user-icon'}>
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={'mobile-control__username'}>
                {username}
            </div>
        </div>
    );
}

const getAuthView = (props) => {
    return (
        <span className={'mobile-control__auth'}>
            <div
                className={'mobile-control__register'}
                onClick={() => props.goToRegisterPage()}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </div>
            <div
                className={'mobile-control__login'}
                onClick={() => props.goToLoginPage()}
            >
                <FontAwesomeIcon icon={faSignInAlt} />
            </div>
        </span>
    );
}

const getUserMenu = props => {
    return (
        <div className={'mobile-control__user-menu-wrapper'}>
            <OutsideClick hideMenu={props.hideMenu}>
                <div
                    className={'mobile-control__user-menu'}
                    onClick={() => {props.toggleMenu()}}
                >
                    <div
                        className={'mobile-control__user-menu-item'}
                        onClick={()=>{props.goToHomePage()}}
                    >
                        На главную
                    </div>
                    <div
                        className={'mobile-control__user-menu-item'}
                        onClick={()=>{props.goToAllStocksPage()}}
                    >
                        Все акции
                    </div>
                    {
                        props.user.user && props.user.user.username ?
                            <div
                                className={'mobile-control__user-menu-item'}
                                onClick={()=>{props.logout()}}
                            >
                                Выход
                            </div> :
                            null
                    }
                </div>
            </OutsideClick>
        </div>
    );
}

const MobileControlView = props => {
    return (
        <div className={'mobile-control'}>
            <div className={'mobile-control__left'}>
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
            <div className={'mobile-control__right'}>
            {
                !props.user.menu.isVisible ?
                    <span
                        className={'mobile-control__menu-button'}
                        onClick={() => {props.showMenu()}}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </span> :
                    null
            }
            {
                props.user.menu.isVisible ?
                    getUserMenu(props) :
                    null
            }
            </div>
        </div>
    );
}

export default MobileControlView;
