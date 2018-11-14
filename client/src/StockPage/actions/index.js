export const GET_STOCK_HISTORY_DATA_REQUEST = 'stockPage/GET_STOCK_HISTORY_DATA_REQUEST';
export const GET_STOCK_HISTORY_DATA_SUCCESS = 'stockPage/GET_STOCK_HISTORY_DATA_SUCCESS';
export const GET_STOCK_HISTORY_DATA_FAILURE = 'stockPage/GET_STOCK_HISTORY_DATA_FAILURE';

export const GET_STOCK_REQUEST = 'stockPage/GET_STOCK_REQUEST';
export const GET_STOCK_SUCCESS = 'stockPage/GET_STOCK_SUCCESS';
export const GET_STOCK_FAILURE = 'stockPage/GET_STOCK_FAILURE';

export const RESET = 'stockPage/RESET';

export const getStockHistoryDataRequest = () => ({
    type: GET_STOCK_HISTORY_DATA_REQUEST
});

export const getStockHistoryDataSuccess = (data) => ({
    type: GET_STOCK_HISTORY_DATA_SUCCESS,
    payload: {
        data
    }
});

export const getStockHistoryDataFailure = (error) => ({
    type: GET_STOCK_HISTORY_DATA_FAILURE,
    payload: {
        error
    }
});

export const getStockRequest = () => ({
    type: GET_STOCK_REQUEST
});

export const getStockSuccess = (data) => ({
    type: GET_STOCK_SUCCESS,
    payload: {
        data
    }
});

export const getStockFailure = (error) => ({
    type: GET_STOCK_FAILURE,
    payload: {
        error
    }
});

export const reset = () => ({
    type: RESET
});
