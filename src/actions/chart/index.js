export const GET_STOCK_HISTORY_DATA_REQUEST = 'chart/GET_STOCK_HISTORY_DATA_REQUEST';
export const GET_STOCK_HISTORY_DATA_SUCCESS = 'chart/GET_STOCK_HISTORY_DATA_SUCCESS';
export const GET_STOCK_HISTORY_DATA_FAILURE = 'chart/GET_STOCK_HISTORY_DATA_FAILURE';

export const GET_STOCK_REQUEST = 'chart/GET_STOCK_REQUEST';
export const GET_STOCK_SUCCESS = 'chart/GET_STOCK_SUCCESS';
export const GET_STOCK_FAILURE = 'chart/GET_STOCK_FAILURE';

export const RESET = 'chart/RESET';

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
