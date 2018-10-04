import React from 'react';
import './header.css';

const HeaderView = props => {
    return (
        <div className={'header-wrapper'}>
            <div className={'header'}>
                <span className={'title'}>MOEX</span>
            </div>
        </div>
    );
}

export default HeaderView;
