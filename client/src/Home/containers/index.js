import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkHome from '../thunks';
import * as thunkUser from '../../User/thunks';
import HomeView from '../components';
import * as util from '../../common/util';

class Home extends Component {
    constructor(props){
        super(props);
        this.setIntervalId = this.setIntervalId.bind(this);
    }

    setIntervalId(id) {
        this.setState({
            intervalId: id
        });
    }

    componentDidMount() {
        this.props.getCurrencies();
        this.props.getStocks();
        const interval = setInterval(this.props.getStocks, 5000);
        this.setIntervalId(interval);
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <HomeView
                navigateToChart={this.props.navigateToChart}
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
    user: state.user.user,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        navigateToChart: (stock) => push(`/chart/${stock}`),
        getStocks: () => thunkHome.getStocks(),
        getCurrencies: () => thunkHome.getCurrencies(),
        goToRegisterPage: () => push('/register'),
        goToLoginPage: () => push('/login'),
        logout: () => thunkUser.logout()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
