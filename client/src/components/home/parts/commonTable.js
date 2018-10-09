import React from 'react';
import './commonTable.css';

const getTableRow = stock => {
    return (
        <tr key={stock.ticker}>
            <td>{stock.shortName}</td>
            <td>{stock.last}</td>
            <td>{stock.change}</td>
            <td>{Math.round((stock.volumeToday / 1000000) * 100) / 100 }</td>
        </tr>
    );
}

const getTable = stocks => {
    return (
        <table className={'common-table'}>
            <tbody>
                <tr>
                    <th>наим.</th>
                    <th>цена</th>
                    <th>% изм.</th>
                    <th>объем, млн</th>
                </tr>
                {stocks.map(item => getTableRow(item))}
            </tbody>
        </table>
    );
}

const CommonTableView = props => {
    return (
        <div className={`common-table-wrapper`}>
            <div className={`common-table-wrapper_position_${props.position}`}>
                <div className={'common-table-wrapper__table-title'}>{props.title}</div>
                {getTable(props.stocks)}
            </div>
        </div>
    );
}

export default CommonTableView;
