import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionsSearchStocks from '~/common/containers/SearchStocks/actions.js';
import * as thunkSearchStocks from '~/common/containers/SearchStocks/thunks.js';
import SearchStocksView from './component.js';
import * as navigation from '~/common/navigation.js';

class SearchStocks extends Component {
    render() {
        return (
            <SearchStocksView
                isSearchVisible={this.props.isSearchVisible}
                showSearch={this.props.showSearch}
                hideSearch={this.props.hideSearch}
                searchInput={this.props.searchInput}
                resetInput={this.props.resetInput}
                foundStocks={this.props.foundStocks}
                searchStocks={this.props.searchStocks}
                goToStockPage={this.props.goToStockPage}
            />
        );
    }
}

const mapStateToProps = state => ({
    isSearchVisible: state.searchStocks.isSearchVisible,
    searchInput: state.searchStocks.searchInput,
    foundStocks: state.searchStocks.foundStocks
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToStockPage: navigation.goToStockPage,
        searchStocks: (text) => thunkSearchStocks.searchStocks(text),
        resetInput: () => actionsSearchStocks.resetInput(),
        showSearch: () => actionsSearchStocks.showSearch(),
        hideSearch: () => actionsSearchStocks.hideSearch()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchStocks);
