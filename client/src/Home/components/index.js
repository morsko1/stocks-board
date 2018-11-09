import React from 'react';
import './index.scss';
import CurrenciesView from './parts/Currencies/Currencies.js';
import FilteredTablesView from './parts/FilteredTablesView/FilteredTablesView.js';
import Layout from '~/common/components/Layout/Layout.js';

const HomeView = props => {
    return (
        <Layout>
        {
            props.stocksFetching && !props.stocks.data.length ?
                <div className="home-container__loader" /> :
                <div className="home-container">
                    <CurrenciesView currencies={props.currencies} />
                    <FilteredTablesView
                        stocks={props.stocks}
                        goToStockPage={props.goToStockPage}
                    />
                </div>
        }
        </Layout>
    );
}

export default HomeView;
