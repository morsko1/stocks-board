import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkRegister from '../thunks';
import RegisterView from '../components';

class Register extends Component {

    componentDidMount() {
        console.log('Register did mount');
        thunkRegister.test();
    }

    render() {
        return (
            <RegisterView
                test={this.props.test}
                testData={this.props.testData}
            />
        );
    }
}

const mapStateToProps = state => ({
    testData: state.register.testData
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        test: () => thunkRegister.test(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
