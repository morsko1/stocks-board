import React from 'react';
import './CommonTable.scss';
import * as util from '~/common/util';

const getTableRow = (stock, props) => {
    return (
        <tr key={stock.ticker}>
            <td
                className="common-table__link-to-stock"
                onClick={() => {props.goToStockPage(stock.ticker)}}
            >
                {stock.shortName}
            </td>
            <td>{stock.last}</td>
            <td className={util.getClassNameForChangeFont(stock.change)}>{stock.change}</td>
            <td>{Math.round((stock.volumeToday / 1000000) * 100) / 100}</td>
        </tr>
    );
}

const getTable = (props) => {
    return (
        <table className={'common-table'}>
            <tbody>
                <tr>
                    <th>наим.</th>
                    <th>цена</th>
                    <th>% изм.</th>
                    <th>объем, млн</th>
                </tr>
                {props.stocks.map(item => getTableRow(item, props))}
            </tbody>
        </table>
    );
}

const CommonTableView = (props) => {
    return (
        <div className={`common-table-wrapper`}>
            <div className={`common-table-wrapper_position_${props.position}`}>
                <div className={'common-table-wrapper__table-title'}>{props.title}</div>
                {getTable(props)}
            </div>
        </div>
    );
}

export default CommonTableView;
