import * as actionsStockPage from '../actions';

const initialState = {
    stock: null,
    stockFetching: false,
    stockFetchingError: null,
    stockHistoryData: [],
    stockHistoryDataFetching: false,
    stockHistoryDataFetchingError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsStockPage.GET_STOCK_HISTORY_DATA_REQUEST:
            return {
                ...state,
                stockHistoryDataFetching: true,
                stockHistoryDataFetchingError: null
            };

        case actionsStockPage.GET_STOCK_HISTORY_DATA_SUCCESS:
            return {
                ...state,
                stockHistoryDataFetching: false,
                stockHistoryDataFetchingError: null,
                stockHistoryData: action.payload.data
            };

        case actionsStockPage.GET_STOCK_HISTORY_DATA_FAILURE:
            return {
                ...state,
                stockHistoryDataFetching: false,
                stockHistoryDataFetchingError: action.payload.error,
            };

        case actionsStockPage.GET_STOCK_REQUEST:
            return {
                ...state,
                stockFetching: true,
                stockFetchingError: null
            };

        case actionsStockPage.GET_STOCK_SUCCESS:
            return {
                ...state,
                stockFetching: false,
                stockFetchingError: null,
                stock: action.payload.data
            };

        case actionsStockPage.GET_STOCK_FAILURE:
            return {
                ...state,
                stockFetching: false,
                stockFetchingError: action.payload.error,
            };

        case actionsStockPage.RESET:
            return {
                ...initialState
            };

        default:
            return state;
    }
};
