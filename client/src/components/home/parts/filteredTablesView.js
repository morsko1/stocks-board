import React from 'react';
import './filteredTablesView.css';
import CommonTable from './commonTable.js';

const filterByMinVolume = (stocks, minValue) => {
    return stocks.filter(item => item.volumeToday > minValue);
}

const FilteredTablesView = props => {
    const filteredByMinVolume = filterByMinVolume(props.stocks.data, 10000000);

    const gainersStocks = filteredByMinVolume.sort((a, b) => {
        return b.change - a.change;
    }).slice(0, 10);

    const losersStocks = filteredByMinVolume.sort((a, b) => {
        return a.change - b.change;
    }).slice(0, 10);

    return (
        <div className={'filtered-tables-view'}>
            <div className={'filtered-tables-view__inner'}>
                <CommonTable stocks={gainersStocks} position={'left'} title={'Лидеры роста'} />
                <CommonTable stocks={losersStocks} position={'right'} title={'Лидеры падения'} />
            </div>
        </div>
    );
}

export default FilteredTablesView;
