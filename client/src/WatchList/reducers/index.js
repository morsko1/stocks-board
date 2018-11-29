import * as actionsWatchList from '../actions';

const initialState = {
    searchInput: '',
    foundStocks: [],
    stocksWatch: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsWatchList.HANDLE_INPUT:
            return {
                ...state,
                searchInput: action.payload.text,
            };

        case actionsWatchList.RESET_INPUT:
            return {
                ...state,
                searchInput: '',
                foundStocks: []
            };

        case actionsWatchList.SET_FOUND_STOCKS:
            return {
                ...state,
                foundStocks: action.payload.stocks
            };

        case actionsWatchList.RESET_FOUND_STOCKS:
            return {
                ...state,
                foundStocks: []
            };

        case actionsWatchList.SET_STOCKS:
            return {
                ...state,
                stocksWatch: action.payload.stocks
            };

        case actionsWatchList.ADD_STOCK:
            return {
                ...state,
                stocksWatch: [
                    ...state.stocksWatch,
                    action.payload.stock
                ]
            };
        case actionsWatchList.DELETE_STOCK:
            return {
                ...state,
                stocksWatch: state.stocksWatch.filter(stock => stock.ticker !== action.payload.stock.ticker)
            };

        default:
            return state;
    }
};
