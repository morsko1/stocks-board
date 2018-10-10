import * as actionsFullTable from '../actions';
import * as util from '../../common/util';
import * as urls from '../../common/urls';
import axios from 'axios';

export const getStocks = () => (dispatch, getState) => {
    const stocksExist = getState().fullTable.stocks.data.length;
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    // avoid unnecessary calls at non-working days and time
    if (stocksExist && ((day === 0 || day === 6) || (hours < 10 || hours > 19))) {
        return;
    }

    dispatch(actionsFullTable.getStocksRequest());

    axios.get(urls.urlStocks)
        .then((response) => {
            if (!response.data.securities.data.length) {
                dispatch(actionsFullTable.getStocksFailure({text: 'response empty'}));
                return;
            }

            const sort = getState().fullTable.sort;
            const convertedData = util.convertStocksResponseToStocks(response.data, sort);

            dispatch(getStocksSuccess(convertedData));
        })
        .catch(
            error => dispatch(actionsFullTable.getStocksFailure(error))
        );
};

const getStocksSuccess = (data) => (dispatch) => {
    dispatch(actionsFullTable.getStocksSuccess(data));
}

export const sortRowsBy = (value) => (dispatch, getState) => {
    if (!value) return;
    const stocks = getState().fullTable.stocks;
    dispatch(actionsFullTable.setSortParameters(value));
    dispatch(getStocksSuccess(stocks.data));
    // if (getState().fullTable.isFiltersVisible) {
    //     dispatch(applyFilters());
    // }
}

export const showOrHideFilters = () => (dispatch, getState) => {
    const isFiltersVisible = getState().fullTable.isFiltersVisible;
    if (isFiltersVisible) {
        dispatch(resetFilters());
    }

    dispatch(actionsFullTable.showOrHideFilters());

    // animation for filters dropdown
    const filtersDiv = document.querySelector('.filters');
    const filtersForm = document.querySelector('.filters-form');
    filtersDiv.clientHeight ?
        filtersDiv.style.height = 0 :
        filtersDiv.style.height = filtersForm.clientHeight + 'px';
}

// export const handleFiltersInput = (filter, type, value) => (dispatch) => {
//     dispatch(actionsFullTable.handleFiltersInput(filter, type, value));
// }

export const applyFilters = (filters) => (dispatch, getState) => {
    const stocks = getState().fullTable.stocks;
    dispatch(actionsFullTable.applyFilters(filters));
    dispatch(getStocksSuccess(stocks.data));
}

export const getCurrencies = () => (dispatch, getState) => {
    const currencies = getState().fullTable.currencies;
    if (currencies.data.length) {
        return;
    }
    dispatch(actionsFullTable.getCurrenciesRequest());
    axios.get(urls.urlCurrencies)
        .then((response) => {
            const convertedData = util.convertCurrenciesResponseToCurrencies(response.data);
            dispatch(actionsFullTable.getCurrenciesSuccess(convertedData));
        })
        .catch();
}

export const resetFilters = () => (dispatch) => {
    dispatch(actionsFullTable.resetFilters());
}
