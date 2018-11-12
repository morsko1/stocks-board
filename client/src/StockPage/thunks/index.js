import * as actionsStockPage from '../actions';
import * as util from '~/common/util';
import * as urls from '~/common/urls';
import axios from 'axios';

export const init = () => (dispatch, getState) => {
    dispatch(getStockHistoryData());
    dispatch(getStock());
}

export const getStockHistoryData = () => (dispatch, getState) => {
    const pathname = getState().router.location.pathname;
    const ticker = pathname.slice(pathname.lastIndexOf('/') + 1);

    dispatch(actionsStockPage.getStockHistoryDataRequest());

    axios.get(urls.getUrlDailyChart(ticker))
        .then((response) => {
            const convertedData = util.convertStockHistoryDataResponseToStockHistoryData(response.data);
            dispatch(actionsStockPage.getStockHistoryDataSuccess(convertedData));
        })
        .catch((error) => {
            dispatch(actionsStockPage.getStockHistoryDataFailure(error));
        });
};


export const getStock = () => (dispatch, getState) => {
    const pathname = getState().router.location.pathname;
    const ticker = pathname.slice(pathname.lastIndexOf('/') + 1);

    dispatch(actionsStockPage.getStockRequest());

    axios.get(urls.getUrlStock(ticker))
        .then((response) => {
            const convertedData = util.convertStockResponseToStock(response.data);
            dispatch(actionsStockPage.getStockSuccess(convertedData));
        })
        .catch((error) => {
            dispatch(actionsStockPage.getStockFailure(error));
        });
};

export const reset = () => (dispatch) => {
    dispatch(actionsStockPage.reset());
}
