import React from 'react';
import './index.css';

const NotFoundView = props => {
    return (
        <div className={'not-found-container'}>
            <div className={'not-found-container__title'}>page not found</div>
            <div className={'not-found-container__link-to-home-wrapper'}>
                <span
                    className={'not-found-container__link-to-home'}
                    onClick={()=>{props.goToHomePage()}}
                >
                    home
                </span>
            </div>
        </div>
    );
}

export default NotFoundView;
