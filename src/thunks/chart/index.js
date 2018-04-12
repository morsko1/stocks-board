import * as actionsChart from '../../actions/chart';
import * as util from '../../common/util';

export const init = () => (dispatch, getState) => {
    dispatch(getStockHistoryData());
    dispatch(getStock());
}

export const getStockHistoryData = () => (dispatch, getState) => {
    const pathname = getState().router.location.pathname;
    const ticker = pathname.slice(pathname.lastIndexOf('/') + 1);

    dispatch(actionsChart.getStockHistoryDataRequest());

    fetch(util.getUrlDailyChart(ticker))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const convertedData = util.convertStockHistoryDataResponseToStockHistoryData(data);

            dispatch(actionsChart.getStockHistoryDataSuccess(convertedData));
        })
        .catch(
            error => dispatch(actionsChart.getStockHistoryDataFailure(error))
        );
};


export const getStock = () => (dispatch, getState) => {
    const pathname = getState().router.location.pathname;
    const ticker = pathname.slice(pathname.lastIndexOf('/') + 1);

    dispatch(actionsChart.getStockRequest());

    fetch(util.getUrlStock(ticker))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const convertedData = util.convertStockResponseToStock(data);

            dispatch(actionsChart.getStockSuccess(convertedData));
        })
        .catch(
            error => dispatch(actionsChart.getStockFailure(error))
        );
};

export const reset = () => (dispatch) => {
    dispatch(actionsChart.reset());
}
