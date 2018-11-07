import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkRegister from '../thunks';
import * as actionsRegister from '../actions';
import RegisterView from '../components';
import * as navigation from '~/common/navigation.js';

class Register extends Component {

    componentWillUnmount() {
       this.props.resetError();
    }

    render() {
        return (
            <RegisterView
                register={this.props.register}
                input={this.props.input}
                isFetching={this.props.isFetching}
                registerError={this.props.registerError}
                handleInput={this.props.handleInput}
                goToLoginPage={this.props.goToLoginPage}
                goToHomePage={this.props.goToHomePage}
            />
        );
    }
}

const mapStateToProps = state => ({
    input: state.register.input,
    isFetching: state.register.isFetching,
    registerError: state.register.registerError
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        register: () => thunkRegister.register(),
        handleInput: (field, text) => actionsRegister.handleInput(field, text),
        resetError: () => actionsRegister.resetError(),
        goToLoginPage: navigation.goToLoginPage,
        goToHomePage: navigation.goToHomePage
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
