import React from 'react';
import './index.css';
import * as util from '../../common/util'

const getTableHead = (props) => {
    const getSortArrow = (parameter) => {
        return props.sort.parameter === parameter ?
            (props.sort.orderByDesc ? '\u2191' : '\u2193') :
            null
    }
    return (
        <tr onClick={(event) => {props.sortRowsBy(event.target.dataset.sortParameter)}}>
            <th key={'head_ticker'}>{'Тикер'}</th>
            <th key={'head_name'}>{'Наименование'}</th>
            <th
                key={'head_prev'}
                className={getSortArrow('prevPrice') ? 'head-active' : ''}
                data-sort-parameter={'prevPrice'}>
                {'Цена,'}
                <br/>
                {'закр'}
                <br/>
                {
                    getSortArrow('prevPrice')
                }
            </th>
            <th
                key={'head_open'}
                className={getSortArrow('open') ? 'head-active' : ''}
                data-sort-parameter={'open'}>
                {'Цена,'}
                <br/>
                {'откр'}
                <br/>
                {
                    getSortArrow('open')
                }
            </th>
            <th
                key={'head_last'}
                className={getSortArrow('last') ? 'head-active' : ''}
                data-sort-parameter={'last'}>
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
                className={getSortArrow('change') ? 'head-active' : ''}
                data-sort-parameter={'change'}>
                {'% изм'}
                <br/>
                {
                    getSortArrow('change')
                }
            </th>
            <th
                key={'head_volume'}
                className={getSortArrow('volumeToday') ? 'head-active' : ''}
                data-sort-parameter={'volumeToday'}>
                {'Объем,'}
                <br/>
                {'млн р'}
                <br/>
                {
                    getSortArrow('volumeToday')
                }
            </th>
            <th
                key={'head_cap'}
                className={getSortArrow('capitalization') ? 'head-active' : ''}
                data-sort-parameter={'capitalization'}>
                {'Капитализация,'}
                <br/>
                {'млрд $'}
                <br/>
                {
                    getSortArrow('capitalization')
                }
            </th>
        </tr>
    )
}

const getTableRow = (item) => {
    const capToDollars = parseFloat(item.capitalization/(1000000000*57)).toFixed(3);

    return (
        <tr key={`row_${item.ticker}`}>
            <td key={`col_ticker${item.ticker}`}>{item.ticker}</td>
            <td key={`col_name${item.ticker}`}>{item.shortName}</td>
            <td key={`col_prev${item.ticker}`}>{item.prevPrice}</td>
            <td key={`col_open${item.ticker}`}>{item.open}</td>
            <td
                key={`col_last${item.ticker}`}
                className={util.getClassNameForCellColor(item.last - item.previousPrice)}>
                {item.last}
            </td>
            <td
                key={`col_change${item.ticker}`}
                className={util.getClassNameForChangeFont(item.change)}>
                {item.change ? item.change + ' %' : ''}
            </td>
            <td key={`col_volume${item.ticker}`}>{(item.volumeToday/1000000).toFixed(2)}</td>
            {/*
                capitalization in $ billions.
                to fix: get correct $ price
            */}
            <td key={`col_cap${item.ticker}`}>{capToDollars}</td>
        </tr>
    );
}


const HomeView = props => (
    <div>
        <h3>Московская Биржа</h3>
        {
            props.stocksFetching && !props.stocks.data.length ?
                <div className={'loader'} /> :
                <div>
                    <table>
                        <tbody>
                        {
                            getTableHead(props)
                        }
                        {
                            props.stocks.data.map(item => getTableRow(item))
                        }
                        </tbody>
                    </table>
                </div>
        }
    </div>
);

export default HomeView;
