import React from 'react';
import './index.css';
import * as util from '../../common/util'

const getTableHead = () => (
    <tr>
        <th key={'head_ticker'}>{'Тикер'}</th>
        <th key={'head_name'}>{'Наименование'}</th>
        <th key={'head_open'}>
            {'Цена,'}
            <br/>
            {'откр'}
        </th>
        <th key={'head_last'}>
            {'Цена,'}
            <br/>
            {'посл'}
        </th>
        <th key={'head_change'}>
            {'% изм'}
        </th>
        <th key={'head_volume'}>
            {'Объем,'}
            <br/>
            {'млн р'}
        </th>
        <th key={'head_cap'}>
            {'Капитализация,'}
            <br/>
            {'млрд $'}
        </th>
    </tr>
)

const getTableRow = (item) => {
    const change = (((item.last - item.open) / item.open) * 100).toFixed(2);
    const capToDollars = parseFloat(item.capitalization/(1000000000*57)).toFixed(3);

    return (
        <tr key={`row_${item.ticker}`}>
            <td key={`col_ticker${item.ticker}`}>{item.ticker}</td>
            <td key={`col_name${item.ticker}`}>{item.shortName}</td>
            <td key={`col_open${item.ticker}`}>{item.open}</td>
            <td
                key={`col_last${item.ticker}`}
                className={util.getClassNameForCellColor(item.last - item.previousPrice)}>
                {item.last}
            </td>
            <td
                key={`col_change${item.ticker}`}
                className={util.getClassNameForChangeFont(change)}>
                {change + ' %'}
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
                            getTableHead()
                        }
                        {
                            // first 30 stocks
                            props.stocks.data.slice(0, 30).map(item => getTableRow(item))
                        }
                        </tbody>
                    </table>
                </div>
        }
    </div>
);

export default HomeView;
