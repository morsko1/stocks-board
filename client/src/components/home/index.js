import React from 'react';
import './index.css';
import HeaderView from './parts/header.js';
import CurrenciesView from './parts/currencies.js';

const HomeView = props => {
    return (
        <div className={'home-container'}>
            <HeaderView />
            <CurrenciesView currencies={props.currencies} />
        </div>
    );
}

export default HomeView;
