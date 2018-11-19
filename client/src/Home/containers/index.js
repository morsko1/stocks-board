import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkUser from '~/User/thunks';
import * as thunkMarketData from '~/common/containers/marketData/thunks';
import HomeView from '../components';
import * as util from '~/common/util';
import * as navigation from '~/common/navigation.js';

class Home extends Component {
    componentDidMount() {
        this.props.getCurrencies();
        this.props.getStocks();
    }

    render() {
        return (
            <HomeView
                goToStockPage={this.props.goToStockPage}
                stocks={this.props.stocks}
                getStocks={this.props.getStocks}
                stocksFetching={this.props.stocksFetching}
                stocksFetchingError={this.props.stocksFetchingError}
                currencies={this.props.currencies}
                goToRegisterPage={this.props.goToRegisterPage}
                goToLoginPage={this.props.goToLoginPage}
                user={this.props.user}
                logout={this.props.logout}
            />
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.marketData.stocks,
    stocksFetching: state.marketData.stocksFetching,
    stocksFetchingError: state.marketData.stocksFetchingError,
    currencies: state.marketData.currencies,
    user: state.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToStockPage: navigation.goToStockPage,
        getStocks: () => thunkMarketData.getStocks(),
        getCurrencies: () => thunkMarketData.getCurrencies(),
        goToRegisterPage: navigation.goToRegisterPage,
        goToLoginPage: navigation.goToLoginPage,
        logout: () => thunkUser.logout()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
