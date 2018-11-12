import React from 'react';
import './index.scss';
import D3chart from './d3/d3chart';
import Layout from '~/common/components/Layout/Layout.js';
import * as util from '~/common/util.js';

const getTableHead = () => {
    return (
        <thead>
            <tr>
                <th key={'head_ticker'} className={'stock-page__col_fixed'}>Тикер</th>
                <th key={'head_name'}>Наим.</th>
                <th key={'head_prev'}>Цена,<br/>закр</th>
                <th key={'head_open'}>Цена,<br/>откр</th>
                <th key={'head_last'}>Цена,<br/>посл</th>
                <th key={'head_change'}>изм,<br/> {'%'} </th>
                <th key={'head_volume'}>Объем,<br/>млн р</th>
                <th key={'head_cap'}>Кап-ция,<br/>млрд р</th>
            </tr>
        </thead>
    );
}

const getTableBody = (stock) => {
    return (
        <tbody>
            <tr key={`row_${stock.ticker}`}>
                <td
                    key={`col_ticker${stock.ticker}`}
                    className={'stock-page__col_fixed stock-page__link-to-stock'}
                >
                    {stock.ticker}
                </td>
                <td
                    key={`col_name${stock.ticker}`}
                >
                    {stock.shortName}
                </td>
                <td key={`col_prev${stock.ticker}`}>{stock.prevPrice}</td>
                <td key={`col_open${stock.ticker}`}>{stock.open}</td>
                <td
                    key={`col_last${stock.ticker}`}
                    className={util.getClassNameForCellColor(stock.last - stock.previousPrice)}>
                    {stock.last}
                </td>
                <td
                    key={`col_change${stock.ticker}`}
                    className={util.getClassNameForChangeFont(stock.change)}>
                    {stock.change ? stock.change + ' %' : ''}
                </td>
                <td key={`col_volume${stock.ticker}`}>{(stock.volumeToday / 1000000).toFixed(2)}</td>
                <td key={`col_cap${stock.ticker}`}>{(stock.capitalization / 1000000000).toFixed(3)}</td>
            </tr>
        </tbody>
    );
}

const getTable = (stock) => {
    return (
        <div className="stock-page__table-stock-container">
            <table className="stock-page__table-stock">
                {getTableHead()}
                {getTableBody(stock)}
            </table>
        </div>
    );
}

const StockPageView = (props) => {
    return (
        <Layout>
    {
        props.stockHistoryDataFetching ?
            <div className="stock-page__loader" /> :
            (
                !props.stockHistoryDataFetchingError ?
                    <div className="stock-page">
                        <div className="stock-page__table-stock-container-wrapper">
                            {props.stock ? getTable(props.stock) : null}
                        </div>
                        <D3chart stockHistoryData={props.stockHistoryData} />
                    </div> :
                    <div className="stock-page__no-data">Нет данных</div>
            )
    }
        </Layout>
    );
}

export default StockPageView;
