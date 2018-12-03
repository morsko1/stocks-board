import * as actionsWatchList from '../actions';
import * as thunksMarketData from '~/common/containers/marketData/thunks';
import * as actionsMarketData from '~/common/containers/marketData/actions';
import axios from 'axios';
import {getUser} from '~/User/thunks';

const getStocksWatch = (username) => (dispatch) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {Authorization: `Bearer ${token}`},
        params: {username: username}
    };
    axios.get('/api/getwatchlist', config)
        .then(response => {
            dispatch(actionsWatchList.setStocks(response.data.stocksWatch));
            localStorage.removeItem('stocksWatch');
        })
        .catch(error => {
        });
}

export const init = () => (dispatch, getState) => {
    const state = getState();
    const stocks = state.marketData.stocks;
    const username = state.user.user && state.user.user.username;
    const token = localStorage.getItem('token');
    if (username) {
        dispatch(getStocksWatch(username));
    } else if (!username && token) {
        dispatch(getUser()).then(data => {
            dispatch(getStocksWatch(data));
        });
    } else {
        const stocksWatch = JSON.parse(localStorage.getItem('stocksWatch'));
        if (stocksWatch && stocksWatch.length) {
            dispatch(actionsWatchList.setStocks(stocksWatch));
        }
    }

    if (!stocks.data.length) {
        dispatch(thunksMarketData.getStocks());
    }
}

const filterStocks = (stocks, text) => {
    return stocks.filter((stock) => {
        return (
            stock.ticker.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            stock.shortName.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
    });
}

export const searchStocks = (text) => (dispatch, getState) => {
    dispatch(actionsWatchList.handleInput(text));
    if (text.length) {
        let stocksData = getState().marketData.stocks.data;
        let result = filterStocks(stocksData, text);
        if (result.length) {
            dispatch(actionsWatchList.setFoundStocks(result));
        } else if (!stocksData.length) {
            dispatch(thunksMarketData.getStocks()).then((data) => {
                result = filterStocks(data, text);
                result.length && dispatch(actionsWatchList.setFoundStocks(result));
            });
        } else {
            dispatch(actionsWatchList.resetFoundStocks());
        }
    }
}

const saveWatchList = () => (dispatch, getState) => {
    const state = getState();
    const stocksWatch = state.watchList.stocksWatch;
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.setItem('stocksWatch', JSON.stringify(stocksWatch));
        return;
    } else {
        const username = state.user.user.username;
        const body = {
            username,
            stocksWatch
        };
        axios.post(
            '/api/savewatchlist',
            body,
            {headers: {Authorization: `Bearer ${token}`}}
        ).then((response) => {
            dispatch(actionsWatchList.setStocks(resonse.data.stocksWatch));
        }).catch((error) => {
        });
    }
}

export const addStock = (stock) => (dispatch, getState) => {
    let stocksWatch = getState().watchList.stocksWatch;
    if (stocksWatch.find(elem => elem.ticker === stock.ticker)) {
        return;
    }

    const {ticker, shortName, fullName, last} = stock;
    const stockToSave = {ticker, shortName, fullName, last, date: new Date()};

    dispatch(actionsWatchList.addStock(stockToSave));
    dispatch(saveWatchList());
}

export const deleteStock = (stock) => (dispatch, getState) => {
    dispatch(actionsWatchList.deleteStock(stock));
    dispatch(saveWatchList());
}
