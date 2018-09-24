import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkHome from '../../thunks/home';
import HomeView from '../../components/home';
import * as util from '../../common/util';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            filtersInput: [
                {
                    name: 'volumeToday',
                    from: '',
                    to: ''
                },
                {
                    name: 'capitalization',
                    from: '',
                    to: ''
                }
            ],
            intervalId: null
        }

        this.handleFiltersInput = this.handleFiltersInput.bind(this);
        this.resetFiltersInput = this.resetFiltersInput.bind(this);
        this.setIntervalId = this.setIntervalId.bind(this);
    }

    handleFiltersInput(filter, type, value) {
        this.setState({
            filtersInput: util.setFiltersState(
                this.state.filtersInput,
                filter,
                type,
                value
            )
        });
    }

    resetFiltersInput() {
        this.setState({
            filtersInput: util.resetFilters(this.state.filtersInput)
        });
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
                // handleFiltersInput={this.props.handleFiltersInput}
                applyFilters={this.props.applyFilters}
                currencies={this.props.currencies}
                resetFilters={this.props.resetFilters}
                filtersInput={this.state.filtersInput}
                handleFiltersInput={this.handleFiltersInput}
                resetFiltersInput={this.resetFiltersInput}
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
        changePage: (stock) => push(`/chart/${stock}`),
        getStocks: () => thunkHome.getStocks(),
        sortRowsBy: (e) => thunkHome.sortRowsBy(e),
        showOrHideFilters: () => thunkHome.showOrHideFilters(),
        // handleFiltersInput: (filter, type, value) => thunkHome.handleFiltersInput(filter, type, value),
        applyFilters: (filters) => thunkHome.applyFilters(filters),
        getCurrencies: () => thunkHome.getCurrencies(),
        resetFilters: () => thunkHome.resetFilters(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
