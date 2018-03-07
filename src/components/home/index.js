import React from 'react';
import './index.css';

const getRow = (item) => {
    return (
        <tr>
            <td>{item.ticker}</td>
            <td>{item.shortName}</td>
            <td>{item.open}</td>
            <td>{item.last}</td>
            <td>{item.volumeToday}</td>
            {/*
                capitalization in $ billions.
                to fix: get correct $ price
            */}
            <td>{parseFloat(item.capitalization/(1000000000*57)).toFixed(3)}</td>
        </tr>
    );
}

const HomeView = props => (
    <div>
        <h3>Московская Биржа</h3>
        {
            props.stocksFetching && !props.stocks.data.length ?
                <div style={{textAlign: 'center'}}>
                    {'Загрузка...'}
                </div> :
                <div>
                    <table>
                        <tr>
                            <th>Тикер</th>
                            <th>{'Наименование'}</th>
                            <th>{'Цена,\nоткр'}</th>
                            <th>{'Цена,\nпосл'}</th>
                            <th>{'Объем'}</th>
                            <th>{'Капитализация,\nмлрд'}</th>
                        </tr>
                        {
                            // first 30 stocks
                            props.stocks.data.slice(0, 30).map(item => getRow(item))
                        }
                    </table>
                </div>
        }
    </div>
);

export default HomeView;
