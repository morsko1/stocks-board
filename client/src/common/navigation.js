import {push} from 'react-router-redux';

export const goToHomePage = () => push('/');
export const goToRegisterPage = () => push('/register');
export const goToLoginPage = () => push('/login');
export const goToAllStocksPage = () => push('/stocks');
export const goToStockPage = (ticker) => push(`/stocks/${ticker}`);
