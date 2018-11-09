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
                        <div className="chart-container__stock-info">
                            <div className="chart-container__stock-title">
                                {props.stock && props.stock.shortName}
                            </div>
                            <div className="chart-container__stock-last-price">
                                Цена: {props.stock && props.stock.prevPrice}р.
                            </div>
                        </div>
                        <D3chart stockHistoryData={props.stockHistoryData} />
                    </div> :
                    <div className="chart-container__no-data">Нет данных</div>
            )
    }
        </Layout>
    );
}

export default ChartView;
