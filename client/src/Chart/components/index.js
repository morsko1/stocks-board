import React from 'react';
import './index.scss';
import D3chart from './d3/d3chart';
import Layout from '~/common/components/Layout/Layout.js';

const ChartView = props => {
    return (
        <Layout>
    {
        props.stockHistoryDataFetching ?
            <div className="chart-container__loader" /> :
            (
                !props.stockHistoryDataFetchingError ?
                    <div className="chart-container">
                        {props.stock && props.stock.shortName}
                        <D3chart stockHistoryData={props.stockHistoryData} />
                    </div> :
                    <div className="chart-container__no-data">Нет данных</div>
            )
    }
        </Layout>
    );
}

export default ChartView;
