import * as actionsSearchStocks from './actions.js';
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
    dispatch(actionsSearchStocks.handleInput(text));
    if (text.length) {
        let stocksData = getState().marketData.stocks.data;
        let result = filterStocks(stocksData, text);
        if (result.length) {
            dispatch(actionsSearchStocks.setFoundStocks(result));
        } else if (!stocksData.length) {
            dispatch(thunksMarketData.getStocks()).then((data) => {
                result = filterStocks(data, text);
                result.length && dispatch(actionsSearchStocks.setFoundStocks(result));
            });
        } else {
            dispatch(actionsSearchStocks.resetFoundStocks());
        }
    }
}
