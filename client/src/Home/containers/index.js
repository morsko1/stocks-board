import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkHome from '../thunks';
import * as thunkUser from '~/User/thunks';
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
    stocks: state.home.stocks,
    stocksFetching: state.home.stocksFetching,
    stocksFetchingError: state.home.stocksFetchingError,
    currencies: state.home.currencies,
    user: state.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToStockPage: navigation.goToStockPage,
        getStocks: () => thunkHome.getStocks(),
        getCurrencies: () => thunkHome.getCurrencies(),
        goToRegisterPage: navigation.goToRegisterPage,
        goToLoginPage: navigation.goToLoginPage,
        logout: () => thunkUser.logout()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
