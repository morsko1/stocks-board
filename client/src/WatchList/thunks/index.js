import * as actionsWatchList from '../actions';
import * as thunksMarketData from '~/common/containers/marketData/thunks';
import * as actionsMarketData from '~/common/containers/marketData/actions';

export const init = () => (dispatch, getState) => {
    const stocks = getState().marketData.stocks;
    const stocksWatch = JSON.parse(localStorage.getItem('stocksWatch'));
    if (stocksWatch && stocksWatch.length) {
        dispatch(actionsWatchList.setStocks(stocksWatch));
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

export const addStock = (stock) => (dispatch, getState) => {
    let stocksWatch = getState().watchList.stocksWatch;
    if (stocksWatch.find(elem => elem.ticker === stock.ticker)) {
        return;
    }

    const {ticker, shortName, fullName, last} = stock;
    const stockToSave = {ticker, shortName, fullName, last, date: new Date()};

    dispatch(actionsWatchList.addStock(stockToSave));
    stocksWatch = getState().watchList.stocksWatch;
    localStorage.setItem('stocksWatch', JSON.stringify(stocksWatch));
}

export const deleteStock = (stock) => (dispatch, getState) => {
    dispatch(actionsWatchList.deleteStock(stock));
    const stocksWatch = getState().watchList.stocksWatch;
    localStorage.setItem('stocksWatch', JSON.stringify(stocksWatch));
}
