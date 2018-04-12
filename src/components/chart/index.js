import React from 'react';
import './index.css';

const ChartView = props => {
    return (
        <div className={'chart-container'}>
            {props.stock && props.stock.shortName}
        </div>
    );
}

export default ChartView;
