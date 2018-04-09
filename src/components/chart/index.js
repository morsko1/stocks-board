import React from 'react';
import './index.css';

const ChartView = props => {
    return (
        <div className={'chart-container'}>
            {props.ticker}
        </div>
    );
}

export default ChartView;
