import React from 'react';
import './index.css';
import HeaderView from './parts/header.js';

const HomeView = props => {
    return (
        <div className={'home-container'}>
            <HeaderView />
        </div>
    );
}

export default HomeView;
