import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkChart from '../thunks';
import ChartView from '../components';

class Chart extends Component {
    componentDidMount() {
        this.props.init();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        return (
            <ChartView
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
    stock: state.chart.stock,
    stockFetching: state.chart.stockFetching,
    stockFetchingError: state.chart.stockFetchingError,
    stockHistoryData: state.chart.stockHistoryData,
    stockHistoryDataFetching: state.chart.stockHistoryDataFetching,
    stockHistoryDataFetchingError: state.chart.stockHistoryDataFetchingError
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        init: () => thunkChart.init(),
        reset: () => thunkChart.reset(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
