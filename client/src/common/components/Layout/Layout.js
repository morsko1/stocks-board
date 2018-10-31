import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import './Layout.scss';
import Header from '../../containers/Header';
import MobileControl from '../../containers/MobileControl';

const Layout = ({children}) => (
    <div className={'layout-container'}>
        <Header />
            {children}
        <MediaQuery maxWidth={767}>
            <MobileControl />
        </MediaQuery>
    </div>
);

export default Layout;
