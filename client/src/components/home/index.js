import React from 'react';
import './index.css';
import HeaderView from './parts/header.js';
import CurrenciesView from './parts/currencies.js';
import FilteredTablesView from './parts/filteredTablesView.js';

const HomeView = props => {
    return (
        <div className={'home-container'}>
            <HeaderView />
            <CurrenciesView currencies={props.currencies} />
            <FilteredTablesView stocks={props.stocks} />
        </div>
    );
}

export default HomeView;
