import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkHome from '../../thunks/home';
import HomeView from '../../components/home';

class Home extends Component {
    componentDidMount () {
        this.props.getStocks();
        setInterval(this.props.getStocks, 5000)
    }

    render() {
        return (
            <HomeView
                changePage={this.props.changePage}
                stocks={this.props.stocks}
                getStocks={this.props.getStocks}
                stocksFetching={this.props.stocksFetching}
                stocksFetchingError={this.props.stocksFetchingError}
            />
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.home.stocks,
    stocksFetching: state.home.stocksFetching,
    stocksFetchingError: state.home.stocksFetchingError,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        changePage: () => push('/about-us'),
        getStocks: () => thunkHome.getStocks(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
