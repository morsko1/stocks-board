import React from 'react';
import './FilteredTablesView.scss';
import CommonTable from '../CommonTable/CommonTable.js';

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

    const maxVolumeStocks = filteredByMinVolume.sort((a, b) => {
        return b.volumeToday - a.volumeToday;
    }).slice(0, 10);

    const maxCapitalizationStocks = filteredByMinVolume.sort((a, b) => {
        return b.capitalization - a.capitalization;
    }).slice(0, 10);

    return (
        <div className={'filtered-tables-view'}>
        {
            props.stocks.data.length ?
                <div className={'filtered-tables-view__inner'}>
                    <CommonTable stocks={gainersStocks} position={'left'} title={'Лидеры роста'} />
                    <CommonTable stocks={losersStocks} position={'right'} title={'Лидеры падения'} />
                    <CommonTable stocks={maxVolumeStocks} position={'left'} title={'Лидеры по объему'} />
                    <CommonTable stocks={maxCapitalizationStocks} position={'right'} title={'Лидеры по капитализации'} />
                </div> :
                <div className="filtered-tables-view__no-data">Нет данных</div>
        }
        </div>
    );
}

export default FilteredTablesView;
