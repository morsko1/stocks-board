import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkHome from '../../thunks/home';
import HomeView from '../../components/home';

class Home extends Component {
    componentDidMount () {
        this.props.getCurrencies();
        this.props.getStocks();
        setInterval(this.props.getStocks, 5000);
    }

    render() {
        return (
            <HomeView
                changePage={this.props.changePage}
                stocks={this.props.stocks}
                getStocks={this.props.getStocks}
                stocksFetching={this.props.stocksFetching}
                stocksFetchingError={this.props.stocksFetchingError}
                sortRowsBy={this.props.sortRowsBy}
                sort={this.props.sort}
                filteredStocks={this.props.filteredStocks}
                isFiltersVisible={this.props.isFiltersVisible}
                filters={this.props.filters}
                showOrHideFilters={this.props.showOrHideFilters}
                handleFiltersInput={this.props.handleFiltersInput}
                applyFilters={this.props.applyFilters}
                currencies={this.props.currencies}
                resetFilters={this.props.resetFilters}
            />
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.home.stocks,
    stocksFetching: state.home.stocksFetching,
    stocksFetchingError: state.home.stocksFetchingError,
    sort: state.home.sort,
    filteredStocks: state.home.filteredStocks,
    isFiltersVisible: state.home.isFiltersVisible,
    filters: state.home.filters,
    currencies: state.home.currencies,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        changePage: () => push('/about-us'),
        getStocks: () => thunkHome.getStocks(),
        sortRowsBy: (e) => thunkHome.sortRowsBy(e),
        showOrHideFilters: () => thunkHome.showOrHideFilters(),
        handleFiltersInput: (filter, type, value) => thunkHome.handleFiltersInput(filter, type, value),
        applyFilters: () => thunkHome.applyFilters(),
        getCurrencies: () => thunkHome.getCurrencies(),
        resetFilters: () => thunkHome.resetFilters(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
