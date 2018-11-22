export const HANDLE_INPUT = 'watchList/HANDLE_INPUT';
export const RESET_INPUT = 'watchList/RESET_INPUT';
export const SET_FOUND_STOCKS = 'watchList/SET_FOUND_STOCKS';
export const RESET_FOUND_STOCKS = 'watchList/RESET_FOUND_STOCKS';
export const ADD_STOCK = 'watchList/ADD_STOCK';
export const DELETE_STOCK = 'watchList/DELETE_STOCK';

export const handleInput = (text) => ({
    type: HANDLE_INPUT,
    payload: {
        text
    }
});

export const resetInput = () => ({
    type: RESET_INPUT
});

export const setFoundStocks = (stocks) => ({
    type: SET_FOUND_STOCKS,
    payload: {
        stocks
    }
});

export const resetFoundStocks = () => ({
    type: RESET_FOUND_STOCKS
});

export const addStock = (stock) => ({
    type: ADD_STOCK,
    payload: {
        stock
    }
});

export const deleteStock = (stock) => ({
    type: DELETE_STOCK,
    payload: {
        stock
    }
});
