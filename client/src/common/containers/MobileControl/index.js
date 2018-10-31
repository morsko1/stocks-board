import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionsUser from '~/User/actions';
import * as thunkUser from '~/User/thunks';
import MobileControlView from './MobileControl.js';

class MobileControl extends Component {
    render() {
        return (
            <MobileControlView
                goToHomePage={this.props.goToHomePage}
                goToRegisterPage={this.props.goToRegisterPage}
                goToLoginPage={this.props.goToLoginPage}
                user={this.props.user}
                logout={this.props.logout}
                toggleMenu={this.props.toggleMenu}
                showMenu={this.props.showMenu}
                hideMenu={this.props.hideMenu}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        goToHomePage: () => push('/'),
        goToRegisterPage: () => push('/register'),
        goToLoginPage: () => push('/login'),
        logout: () => thunkUser.logout(),
        toggleMenu: () => actionsUser.toggleMenu(),
        showMenu: () => actionsUser.showMenu(),
        hideMenu: () => actionsUser.hideMenu()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MobileControl);
