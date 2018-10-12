import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkLogin from '../thunks';
import LoginView from '../components';

class Login extends Component {

    componentDidMount() {
        console.log('Login did mount');
        thunkLogin.test();
    }

    render() {
        return (
            <LoginView
                test={this.props.test}
                testData={this.props.testData}
            />
        );
    }
}

const mapStateToProps = state => ({
    testData: state.login.testData
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        test: () => thunkLogin.test(),
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
