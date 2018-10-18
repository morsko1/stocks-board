import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkLogin from '../thunks';
import * as actionsLogin from '../actions';
import LoginView from '../components';

class Login extends Component {

    componentDidMount() {
        console.log('Login did mount');
    }

    render() {
        return (
            <LoginView
                login={this.props.login}
                input={this.props.input}
                handleInput={this.props.handleInput}
                goToRegisterPage={this.props.goToRegisterPage}
                goToHomePage={this.props.goToHomePage}
            />
        );
    }
}

const mapStateToProps = state => ({
    input: state.login.input
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        login: () => thunkLogin.login(),
        handleInput: (field, text) => actionsLogin.handleInput(field, text),
        goToRegisterPage: () => push('/register'),
        goToHomePage: () => push('/')
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
