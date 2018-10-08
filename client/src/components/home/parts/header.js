import React from 'react';
import './header.css';

const HeaderView = props => {
    return (
        <div className={'header'}>
            <div className={'header__inner'}>
                <span className={'header__title'}>MOEX</span>
            </div>
        </div>
    );
}

export default HeaderView;
