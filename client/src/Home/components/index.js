import React from 'react';
import './index.css';
import HeaderView from './parts/Header/Header.js';
import CurrenciesView from './parts/Currencies/Currencies.js';
import FilteredTablesView from './parts/FilteredTablesView/FilteredTablesView.js';

const HomeView = props => {
    return (
        <div className={'home-container'}>
            <HeaderView
                goToRegisterPage={props.goToRegisterPage}
                goToLoginPage={props.goToLoginPage}
            />
            <CurrenciesView currencies={props.currencies} />
            <FilteredTablesView stocks={props.stocks} />
        </div>
    );
}

export default HomeView;
