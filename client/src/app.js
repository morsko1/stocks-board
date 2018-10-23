import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Home from './Home';
import Chart from './Chart';
import FullTable from './FullTable';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';

const App = () => (
    <div className={'container'}>
        <main>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/chart/:ticker' component={Chart} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/allstocks' component={FullTable} />
                <Route component={NotFound} />
            </Switch>
        </main>
    </div>
);

export default App;
