import React from 'react';
import './index.scss';
import D3chart from './d3/d3chart';
import Layout from '~/common/components/Layout/Layout.js';
import * as util from '~/common/util.js';
import StocksTable from '~/common/components/StocksTable';

const getTable = (stock) => {
    return (
        <div className="stock-page__table-stock-container">
            <StocksTable stocks={{data: [stock]}} />
        </div>
    );
}

const StockPageView = (props) => {
    return (
        <Layout>
    {
        props.stockFetching || props.stockHistoryDataFetching ?
            <div className="stock-page__loader" /> :
            (
                !props.stockHistoryDataFetchingError ?
                    <div className="stock-page">
                        {props.stock ? getTable(props.stock) : null}
                        <D3chart stockHistoryData={props.stockHistoryData} />
                    </div> :
                    <div className="stock-page__no-data">Нет данных</div>
            )
    }
        </Layout>
    );
}

export default StockPageView;
