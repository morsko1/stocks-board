import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionsWatchList from '../actions';
import * as thunkWatchList from '../thunks';
import * as thunkMarketData from '~/common/containers/marketData/thunks';
import WatchListView from '../components';
import * as util from '~/common/util';
import * as navigation from '~/common/navigation.js';

class WatchList extends Component {
    render() {
        return (
            <WatchListView
                goToStockPage={this.props.goToStockPage}
                testData={this.props.testData}
                stocks={this.props.stocks}
                searchInput={this.props.searchInput}
                resetInput={this.props.resetInput}
                searchStocks={this.props.searchStocks}
                foundStocks={this.props.foundStocks}
                addStock={this.props.addStock}
                deleteStock={this.props.deleteStock}
            />
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.watchList.stocks,
    searchInput: state.watchList.searchInput,
    foundStocks: state.watchList.foundStocks,
    testData: state.watchList.testData,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToStockPage: navigation.goToStockPage,
        handleInput: () => actionsWatchList.handleInput(),
        resetInput: () => actionsWatchList.resetInput(),
        searchStocks: (text) => thunkWatchList.searchStocks(text),
        addStock: (stock) => thunkWatchList.addStock(stock),
        deleteStock: (stock) => thunkWatchList.deleteStock(stock),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
