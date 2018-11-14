import * as actionsSearchStocks from './actions.js';

export const searchStocks = (text) => (dispatch, getState) => {
    dispatch(actionsSearchStocks.handleInput(text));
    if (text.length) {
        const stocksHome = getState().home.stocks.data;
        let result = stocksHome.filter((stock) => {
            return (
                stock.ticker.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                stock.shortName.toLowerCase().indexOf(text.toLowerCase()) > -1
            );
        });
        if (!result.length) {
            const stocksList = getState().fullTable.stocks.data;
            result = stocksList.filter((stock) => {
                return (
                    stock.ticker.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                    stock.shortName.toLowerCase().indexOf(text.toLowerCase()) > -1
                );
            });
            dispatch(actionsSearchStocks.setFoundStocks(result));
        } else {
            dispatch(actionsSearchStocks.setFoundStocks(result));
        }
    }
}
