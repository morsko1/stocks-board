import React from 'react';
import {
    Route,
} from 'react-router-dom';
import Home from './containers/home';
import Chart from  './containers/chart';
import Register from  './containers/register';

const App = () => (
    <div className={'container'}>
        <main>
            <Route exact path='/' component={Home} />
            <Route exact path='/chart/:ticker' component={Chart} />
            <Route exact path='/register' component={Register} />
        </main>
    </div>
);

export default App;
