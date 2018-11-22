import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Home from './Home';
import StockPage from './StockPage';
import FullTable from './FullTable';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
import WatchList from './WatchList';

const App = () => (
    <div className={'container'}>
        <main>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/stocks' component={FullTable} />
                <Route exact path='/stocks/:ticker' component={StockPage} />
                <Route exact path='/watchlist' component={WatchList} />
                <Route component={NotFound} />
            </Switch>
        </main>
    </div>
);

export default App;
