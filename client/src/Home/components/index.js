import React from 'react';
import './index.css';
import HeaderView from '../../components/Header/Header.js';
import CurrenciesView from './parts/Currencies/Currencies.js';
import FilteredTablesView from './parts/FilteredTablesView/FilteredTablesView.js';

const HomeView = props => {
    return (
        <div className={'home-container'}>
            <HeaderView
                goToRegisterPage={props.goToRegisterPage}
                goToLoginPage={props.goToLoginPage}
                user={props.user}
                logout={props.logout}
            />
            <CurrenciesView currencies={props.currencies} />
            <FilteredTablesView stocks={props.stocks} />
        </div>
    );
}

export default HomeView;
