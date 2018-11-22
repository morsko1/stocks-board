import * as actionsWatchList from '../actions';
import * as thunksMarketData from '~/common/containers/marketData/thunks';

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
    const stocks = getState().watchList.stocks;
    if (stocks.includes(stock)) {
        return;
    }

    dispatch(actionsWatchList.addStock(stock));
}

export const deleteStock = (stock) => (dispatch, getState) => {
    dispatch(actionsWatchList.deleteStock(stock));
}
