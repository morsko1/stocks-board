export const SHOW_SEARCH = 'searchStocks/SHOW_SEARCH';
export const HIDE_SEARCH = 'searchStocks/HIDE_SEARCH';
export const HANDLE_INPUT = 'searchStocks/HANDLE_INPUT';
export const RESET_INPUT = 'searchStocks/RESET_INPUT';
export const SET_FOUND_STOCKS = 'searchStocks/SET_FOUND_STOCKS';
export const RESET_FOUND_STOCKS = 'searchStocks/RESET_FOUND_STOCKS';


export const showSearch = () => ({
    type: SHOW_SEARCH
});

export const hideSearch = () => ({
    type: HIDE_SEARCH
});

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
