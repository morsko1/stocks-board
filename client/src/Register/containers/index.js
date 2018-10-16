import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkRegister from '../thunks';
import * as actionsRegister from '../actions';
import RegisterView from '../components';

class Register extends Component {

    componentDidMount() {
        console.log('Register did mount');
    }

    render() {
        return (
            <RegisterView
                register={this.props.register}
                input={this.props.input}
                handleInput={this.props.handleInput}
                goToLoginPage={this.props.goToLoginPage}
            />
        );
    }
}

const mapStateToProps = state => ({
    input: state.register.input
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        register: () => thunkRegister.register(),
        handleInput: (field, text) => actionsRegister.handleInput(field, text),
        goToLoginPage: () => push('/login')
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
