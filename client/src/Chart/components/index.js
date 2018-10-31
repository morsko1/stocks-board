import React from 'react';
import './index.scss';
import D3chart from './d3/d3chart';

const ChartView = props => {
    return (
        <div className={'chart-container'}>
            {props.stock && props.stock.shortName}
            <D3chart stockHistoryData={props.stockHistoryData} />
        </div>
    );
}

export default ChartView;
