import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkLogin from '../thunks';
import * as actionsLogin from '../actions';
import LoginView from '../components';
import * as navigation from '~/common/navigation.js';

class Login extends Component {

    componentWillUnmount() {
       this.props.resetError();
    }

    render() {
        return (
            <LoginView
                login={this.props.login}
                input={this.props.input}
                handleInput={this.props.handleInput}
                isFetching={this.props.isFetching}
                loginError={this.props.loginError}
                goToRegisterPage={this.props.goToRegisterPage}
                goToHomePage={this.props.goToHomePage}
            />
        );
    }
}

const mapStateToProps = state => ({
    input: state.login.input,
    isFetching: state.login.isFetching,
    loginError: state.login.loginError
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        login: () => thunkLogin.login(),
        handleInput: (field, text) => actionsLogin.handleInput(field, text),
        resetError: () => actionsLogin.resetError(),
        goToRegisterPage: navigation.goToRegisterPage,
        goToHomePage: navigation.goToHomePage
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
