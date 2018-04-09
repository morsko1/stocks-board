import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkChart from '../../thunks/chart';
import ChartView from '../../components/chart';

class Chart extends Component {
    componentDidMount () {
        this.props.setCurrentTicker();
    }

    render() {
        return (
            <ChartView
                setCurrentTicker={this.props.setCurrentTicker}
                ticker={this.props.ticker}
                stock={this.props.stock}
            />
        );
    }
}

const mapStateToProps = state => ({
    ticker: state.chart.ticker,
    stock: state.chart.stock,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        setCurrentTicker: () => thunkChart.setCurrentTicker(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
