import React from 'react';
import './index.scss';
import Layout from '~/common/components/Layout/Layout.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faTimes,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import * as util from '~/common/util.js';

const getSearchForm = (props) => {
    return (
        <form
            className="watch-list__add-stock-form"
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                type="text"
                id="watch-list__add-stock-input"
                className="watch-list__add-stock-input"
                value={props.searchInput}
                placeholder="Добавить"
                onChange={(e) => {props.searchStocks(e.target.value)}}
            />
            {
                props.searchInput.length ?
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="watch-list__clear-icon"
                        onClick={() => {props.resetInput()}}
                    /> :
                    <FontAwesomeIcon
                        className="watch-list__search-icon"
                        icon={faSearch}
                        onClick={() => {
                            if (props.isSearchVisible) {
                                props.resetInput();
                                props.hideSearch();
                            }
                        }}
                    />
            }
        </form>
    )
}

const getSearchResultList = (props) => {
    return (
        <div className="watch-list__search-result">
        {
            props.foundStocks.length ?
                props.foundStocks.map(stock => {
                    return (
                        <div
                            key={stock.ticker}
                            className="watch-list__search-result-item"
                        >
                            <div className="watch-list__search-result-item-text">
                                {`${stock.shortName} (${stock.ticker})`}
                            </div>
                            <div
                                className="watch-list__search-result-add-icon"
                                onClick={() => {props.addStock(stock)}}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    );
                }) :
                <div className="watch-list__search-result-item">Нет данных</div>
        }
        </div>
    );
}

const getSearchView = (props) => {
    return (
        <div className={'watch-list__search-container'}>
            {getSearchForm(props)}
            {
                props.searchInput.length ?
                    getSearchResultList(props) :
                    null
            }
        </div>
    );
}

const getTableHead = (props) => {
    return (
        <thead>
            <tr onClick={(event) => {props.sortRowsBy(event.target.dataset.sortParameter)}}>
                <th className="watch-list__col_fixed">Тикер</th>
                <th>Наим.</th>
                <th>Цена,<br/>закр<br/></th>
                <th>Цена,<br/>откр<br/></th>
                <th>Цена,<br/>посл<br/></th>
                <th>изм,<br/>%</th>
                <th>Объем,<br/>млн р<br/></th>
                <th>Кап-ция,<br/>млрд р<br/></th>
                <th></th>
            </tr>
        </thead>
    );
}

const getTableBody = (props) => {
    const tickersWatch = props.stocksWatch.map(stock => stock.ticker);
    const filteredStocks = props.stocks.data.filter(stock => tickersWatch.includes(stock.ticker));

    return (
        <tbody>
        {
            filteredStocks.map((stock) => {
                return (
                    <tr key={stock.ticker}>
                        <td
                            className={'watch-list__col_fixed watch-list__link-to-stock'}
                            onClick={() => {props.goToStockPage(stock.ticker)}}
                        >
                            {stock.ticker}
                        </td>
                        <td
                            className={'watch-list__link-to-stock'}
                            onClick={() => {props.goToStockPage(stock.ticker)}}
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
                        <td>
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="watch-list__delete-stock-icon"
                                onClick={() => {props.deleteStock(stock)}}
                            />
                        </td>
                    </tr>
                )
            })
        }
        </tbody>
    );
}

const getTableView = (props) => {
    return (
        <div className="watch-list__table-stocks-container">
            <table className="watch-list__table-stocks">
                {getTableHead(props)}
                {getTableBody(props)}
            </table>
        </div>
    );
}

const WatchListView = props => {
    return (
        <Layout>
        {
            <div className="watch-list">
                <div className="watch-list__title">Вотч-лист</div>
                {getSearchView(props)}
                {
                    props.stocksWatch.length ?
                    getTableView(props) :
                    <div className="watch-list__empty">Вотч-лист пуст. Добавьте элементы.</div>}
            </div>
        }
        </Layout>
    );
}

export default WatchListView;
