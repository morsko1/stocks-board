import * as actionsSearchStocks from './actions.js';

const initialState = {
    isSearchVisible: false,
    searchInput: '',
    foundStocks: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsSearchStocks.SHOW_SEARCH:
            return {
                ...state,
                isSearchVisible: true
            };

        case actionsSearchStocks.HIDE_SEARCH:
            return {
                ...state,
                isSearchVisible: false
            };

        case actionsSearchStocks.HANDLE_INPUT:
            return {
                ...state,
                searchInput: action.payload.text,
            };

        case actionsSearchStocks.RESET_INPUT:
            return {
                ...state,
                searchInput: '',
                foundStocks: []
            };

        case actionsSearchStocks.SET_FOUND_STOCKS:
            return {
                ...state,
                foundStocks: action.payload.stocks
            };

         case actionsSearchStocks.RESET_FOUND_STOCKS:
            return {
                ...state,
                foundStocks: []
            };

        default:
            return state;
    }
};
