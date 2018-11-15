import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkStockPage from '../thunks';
import StockPageView from '../components';

class StockPage extends Component {
    componentDidMount() {
        this.props.init();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== window.location.pathname) {
            this.props.init();
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        return (
            <StockPageView
                stock={this.props.stock}
                stockFetching={this.props.stockFetching}
                stockFetchingError={this.props.stockFetchingError}
                stockHistoryData={this.props.stockHistoryData}
                stockHistoryDataFetching={this.props.stockHistoryDataFetching}
                stockHistoryDataFetchingError={this.props.stockHistoryDataFetchingError}
            />
        );
    }
}

const mapStateToProps = state => ({
    stock: state.stockPage.stock,
    stockFetching: state.stockPage.stockFetching,
    stockFetchingError: state.stockPage.stockFetchingError,
    stockHistoryData: state.stockPage.stockHistoryData,
    stockHistoryDataFetching: state.stockPage.stockHistoryDataFetching,
    stockHistoryDataFetchingError: state.stockPage.stockHistoryDataFetchingError
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        init: () => thunkStockPage.init(),
        reset: () => thunkStockPage.reset(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(StockPage);
