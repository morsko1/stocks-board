import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from './home';

export default combineReducers({
    router: routerReducer,
    home
});
