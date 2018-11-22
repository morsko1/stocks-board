import React from 'react';
import './index.scss';
import Layout from '~/common/components/Layout/Layout.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faTimes,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

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

const getTableBody = (props) => {
    return (
        <tbody>
        {
            props.stocks.map((stock) => {
                return (
                    <tr key={stock.ticker}>
                        <td
                            className={'watch-list__link-to-stock'}
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
                <thead>
                    <tr>
                        <th>Тикер</th>
                        <th>Наим.</th>
                        <th></th>
                    </tr>
                </thead>
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
                    props.stocks.length ?
                    getTableView(props) :
                    <div className="watch-list__empty">Вотч-лист пуст. Добавьте элементы.</div>}
            </div>
        }
        </Layout>
    );
}

export default WatchListView;
