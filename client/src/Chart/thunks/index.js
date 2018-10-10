import * as actionsChart from '../actions';
import * as util from '../../common/util';
import * as urls from '../../common/urls';
import axios from 'axios';

export const init = () => (dispatch, getState) => {
    dispatch(getStockHistoryData());
    dispatch(getStock());
}

export const getStockHistoryData = () => (dispatch, getState) => {
    const pathname = getState().router.location.pathname;
    const ticker = pathname.slice(pathname.lastIndexOf('/') + 1);

    dispatch(actionsChart.getStockHistoryDataRequest());

    axios.get(urls.getUrlDailyChart(ticker))
        .then((response) => {
            const convertedData = util.convertStockHistoryDataResponseToStockHistoryData(response.data);
            dispatch(actionsChart.getStockHistoryDataSuccess(convertedData));
        })
        .catch((error) => {
            dispatch(actionsChart.getStockHistoryDataFailure(error));
        });
};


export const getStock = () => (dispatch, getState) => {
    const pathname = getState().router.location.pathname;
    const ticker = pathname.slice(pathname.lastIndexOf('/') + 1);

    dispatch(actionsChart.getStockRequest());

    axios.get(urls.getUrlStock(ticker))
        .then((response) => {
            const convertedData = util.convertStockResponseToStock(response.data);
            dispatch(actionsChart.getStockSuccess(convertedData));
        })
        .catch((error) => {
            dispatch(actionsChart.getStockFailure(error));
        });
};

export const reset = () => (dispatch) => {
    dispatch(actionsChart.reset());
}
