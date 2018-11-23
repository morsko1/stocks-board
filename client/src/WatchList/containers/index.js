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
    componentDidMount () {
        this.props.init();
    }

    render() {
        return (
            <WatchListView
                goToStockPage={this.props.goToStockPage}
                stocks={this.props.stocks}
                stocksWatch={this.props.stocksWatch}
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
    stocks: state.marketData.stocks,
    stocksWatch: state.watchList.stocksWatch,
    searchInput: state.watchList.searchInput,
    foundStocks: state.watchList.foundStocks,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToStockPage: navigation.goToStockPage,
        init: (text) => thunkWatchList.init(text),
        handleInput: () => actionsWatchList.handleInput(),
        resetInput: () => actionsWatchList.resetInput(),
        searchStocks: (text) => thunkWatchList.searchStocks(text),
        addStock: (stock) => thunkWatchList.addStock(stock),
        deleteStock: (stock) => thunkWatchList.deleteStock(stock),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
