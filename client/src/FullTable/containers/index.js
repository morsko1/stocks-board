import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionsFullTable from '../actions';
import * as thunkFullTable from '../thunks';
import FullTableView from '../components';
import * as util from '~/common/util';
import * as navigation from '~/common/navigation.js';

class FullTable extends Component {
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
            <FullTableView
                goToStockPage={this.props.goToStockPage}
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
                numberRowsToShow={this.props.numberRowsToShow}
                expandTable={this.props.expandTable}
                collapseTable={this.props.collapseTable}
            />
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.fullTable.stocks,
    stocksFetching: state.fullTable.stocksFetching,
    stocksFetchingError: state.fullTable.stocksFetchingError,
    sort: state.fullTable.sort,
    filteredStocks: state.fullTable.filteredStocks,
    isFiltersVisible: state.fullTable.isFiltersVisible,
    filters: state.fullTable.filters,
    currencies: state.fullTable.currencies,
    numberRowsToShow: state.fullTable.numberRowsToShow,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToStockPage: navigation.goToStockPage,
        getStocks: () => thunkFullTable.getStocks(),
        sortRowsBy: (e) => thunkFullTable.sortRowsBy(e),
        showOrHideFilters: () => thunkFullTable.showOrHideFilters(),
        // handleFiltersInput: (filter, type, value) => thunkFullTable.handleFiltersInput(filter, type, value),
        applyFilters: (filters) => thunkFullTable.applyFilters(filters),
        getCurrencies: () => thunkFullTable.getCurrencies(),
        resetFilters: () => thunkFullTable.resetFilters(),
        expandTable: () => actionsFullTable.expandTable(),
        collapseTable: () => actionsFullTable.collapseTable(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(FullTable);
