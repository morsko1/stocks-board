import React from 'react';
import './index.css';

const getRow = (item) => {
    return (
        <tr key={`row_${item.ticker}`}>
            <td key={`col_ticker${item.ticker}`}>{item.ticker}</td>
            <td key={`col_name${item.ticker}`}>{item.shortName}</td>
            <td key={`col_open${item.ticker}`}>{item.open}</td>
            <td key={`col_last${item.ticker}`}>{item.last}</td>
            <td key={`col_volume${item.ticker}`}>{(item.volumeToday/1000000).toFixed(2)}</td>
            {/*
                capitalization in $ billions.
                to fix: get correct $ price
            */}
            <td key={`col_cap${item.ticker}`}>{parseFloat(item.capitalization/(1000000000*57)).toFixed(3)}</td>
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
                            <tr>
                                <th key={'head_ticker'}>Тикер</th>
                                <th key={'head_name'}>{'Наименование'}</th>
                                <th key={'head_open'}>{'Цена,\nоткр'}</th>
                                <th key={'head_last'}>{'Цена,\nпосл'}</th>
                                <th key={'head_volume'}>{'Объем,\nмлн р'}</th>
                                <th key={'head_cap'}>{'Капитализация,\nмлрд $'}</th>
                            </tr>
                            {
                                // first 30 stocks
                                props.stocks.data.slice(0, 30).map(item => getRow(item))
                            }
                        </tbody>
                    </table>
                </div>
        }
    </div>
);

export default HomeView;
