import React from 'react';
import './index.css';
import CurrenciesView from './parts/Currencies/Currencies.js';
import FilteredTablesView from './parts/FilteredTablesView/FilteredTablesView.js';
import Layout from '../../components/Layout/Layout.js';

const HomeView = props => {
    return (
        <Layout>
            <div className={'home-container'}>
                <CurrenciesView currencies={props.currencies} />
                <FilteredTablesView stocks={props.stocks} />
            </div>
        </Layout>
    );
}

export default HomeView;
