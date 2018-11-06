import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotFoundView from '../components';
import * as navigation from '~/common/navigation.js';

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
        goToHomePage: navigation.goToHomePage
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
