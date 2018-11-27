import React from 'react';
import './index.scss';
import * as util from '~/common/util';
import Layout from '~/common/components/Layout/Layout.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleUp,
    faAngleDoubleDown,
    faArrowUp,
    faArrowDown,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

const getTableHead = (props) => {
    const getSortArrow = (parameter) => {
        if (!props.sort) {
            return;
        }
        return props.sort.parameter === parameter ?
            <FontAwesomeIcon icon={props.sort.orderByDesc ? faArrowUp : faArrowDown} /> :
            null;
    }
    return (
        <thead>
            <tr onClick={(event) => {props.sortRowsBy && props.sortRowsBy(event.target.dataset.sortParameter)}}>
                <th className={'stocks-table__col_fixed'}>{'Тикер'}</th>
                <th>{'Наим.'}</th>
                <th
                    className={getSortArrow('prevPrice') ? 'stocks-table__table-stocks-head_active' : ''}
                    data-sort-parameter={'prevPrice'}
                >
                    {'Цена,'}
                    <br/>
                    {'закр'}
                    <br/>
                    {
                        getSortArrow('prevPrice')
                    }
                </th>
                <th
                    className={getSortArrow('open') ? 'stocks-table__table-stocks-head_active' : ''}
                    data-sort-parameter={'open'}
                >
                    {'Цена,'}
                    <br/>
                    {'откр'}
                    <br/>
                    {
                        getSortArrow('open')
                    }
                </th>
                <th
                    className={getSortArrow('last') ? 'stocks-table__table-stocks-head_active' : ''}
                    data-sort-parameter={'last'}
                >
                    {'Цена,'}
                    <br/>
                    {'посл'}
                    <br/>
                    {
                        getSortArrow('last')
                    }
                </th>
                <th
                    key={'head_change'}
                    className={getSortArrow('change') ? 'stocks-table__table-stocks-head_active' : ''}
                    data-sort-parameter={'change'}
                >
                    {'изм,'}
                    <br/>
                    {'%'}
                    <br/>
                    {
                        getSortArrow('change')
                    }
                </th>
                <th
                    className={getSortArrow('volumeToday') ? 'stocks-table__table-stocks-head_active' : ''}
                    data-sort-parameter={'volumeToday'}
                >
                    {'Объем,'}
                    <br/>
                    {'млн р'}
                    <br/>
                    {
                        getSortArrow('volumeToday')
                    }
                </th>
                <th
                    className={getSortArrow('capitalization') ? 'stocks-table__table-stocks-head_active' : ''}
                    data-sort-parameter={'capitalization'}
                >
                    {'Кап-ция,'}
                    <br/>
                    {'млрд р'}
                    <br/>
                    {
                        getSortArrow('capitalization')
                    }
                </th>
                {
                    props.deleteStock ?
                    <th></th> :
                    null
                }
            </tr>
        </thead>
    );
}

const getTableRow = (item, props) => {
    return (
        <tr key={`row_${item.ticker}`}>
            <td
                className={'stocks-table__col_fixed stocks-table__link-to-stock'}
                onClick={() => {props.goToStockPage(item.ticker)}}
            >
                {item.ticker}
            </td>
            <td
                className={'stocks-table__link-to-stock'}
                onClick={() => {props.goToStockPage(item.ticker)}}
            >
                {item.shortName}
            </td>
            <td>{item.prevPrice}</td>
            <td>{item.open}</td>
            <td className={util.getClassNameForCellColor(item.last - item.previousPrice)}>
                {item.last}
            </td>
            <td className={util.getClassNameForChangeFont(item.change)}>
                {item.change ? item.change + ' %' : ''}
            </td>
            <td>{(item.volumeToday / 1000000).toFixed(2)}</td>
            <td>{(item.capitalization / 1000000000).toFixed(3)}</td>
            {
                props.deleteStock ?
                <td>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="stocks-table__delete-stock-icon"
                        onClick={() => {props.deleteStock(item)}}
                    />
                </td> :
                null
            }
        </tr>
    );
}

const StocksTableView = (props) => {
    return (
        props.stocks.data.length ?
            <div className="stocks-table__container">
                 <table className={'stocks-table__table-stocks'}>
                     {
                         getTableHead(props)
                     }
                     <tbody>
                     {
                         props.stocks.data.slice(0, props.numberRowsToShow).map(item => getTableRow(item, props))
                     }
                     </tbody>
                 </table>
             </div> :
            null
    );
}

export default StocksTableView;
