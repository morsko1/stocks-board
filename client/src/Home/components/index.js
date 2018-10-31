import React from 'react';
import './index.scss';
import CurrenciesView from './parts/Currencies/Currencies.js';
import FilteredTablesView from './parts/FilteredTablesView/FilteredTablesView.js';
import Layout from '~/common/components/Layout/Layout.js';

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
