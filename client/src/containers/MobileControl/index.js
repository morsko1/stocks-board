import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkUser from '../../User/thunks';
import MobileControlView from './MobileControl.js';

class MobileControl extends Component {
    render() {
        return (
            <MobileControlView
                goToRegisterPage={this.props.goToRegisterPage}
                goToLoginPage={this.props.goToLoginPage}
                user={this.props.user}
                logout={this.props.logout}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToRegisterPage: () => push('/register'),
        goToLoginPage: () => push('/login'),
        logout: () => thunkUser.logout()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MobileControl);
