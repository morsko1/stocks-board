import React from 'react';
import './MobileControl.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

const getUserView = (props) => {
    const username = props.user.user.username;
    return (
        <span className={'mobile-control__user'}>
            <FontAwesomeIcon icon={faUser} />
        </span>
    );
}

const getAuthView = (props) => {
    return (
        <span className={'mobile-control__auth'}>
            <span
                className={'mobile-control__register'}
                onClick={() => props.goToRegisterPage()}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </span>
            <span
                className={'mobile-control__login'}
                onClick={() => props.goToLoginPage()}
            >
                <FontAwesomeIcon icon={faSignInAlt} />
            </span>
        </span>
    );
}

const MobileControlView = props => {
    return (
        <div className={'mobile-control'}>
            <div className={'mobile-control__right'}>
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

export default MobileControlView;
