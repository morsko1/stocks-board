import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotFoundView from '../components';

class NotFound extends Component {

    componentDidMount() {
        console.log('NotFound did mount');
    }

    render() {
        return (
            <NotFoundView goToHomePage={this.props.goToHomePage} />
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToHomePage: () => push('/')
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
