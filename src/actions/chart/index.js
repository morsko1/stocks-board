export const SET_CURRENT_TICKER = 'chart/SET_CURRENT_TICKER';

export const setCurrentTicker = (ticker) => ({
    type: SET_CURRENT_TICKER,
    payload: {
        ticker
    }
});
