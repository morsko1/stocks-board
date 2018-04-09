import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from './home';
import chart from './chart';

export default combineReducers({
    router: routerReducer,
    home,
    chart
});
