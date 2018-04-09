import React from 'react';
import {
    Route,
} from 'react-router-dom';
import Home from './containers/home';
import Chart from  './containers/chart';

const App = () => (
    <div className={'container'}>
        <main>
            <Route exact path='/' component={Home} />
            <Route exact path='/chart/:ticker' component={Chart} />
        </main>
    </div>
);

export default App;
