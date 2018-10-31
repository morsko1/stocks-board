import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkUser from '~/User/thunks';
import HeaderView from './Header.js';

class Header extends Component {
    render() {
        return (
            <HeaderView
                goToHomePage={this.props.goToHomePage}
                goToRegisterPage={this.props.goToRegisterPage}
                goToLoginPage={this.props.goToLoginPage}
                goToAllStocksPage={this.props.goToAllStocksPage}
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
        goToHomePage: () => push('/'),
        goToRegisterPage: () => push('/register'),
        goToLoginPage: () => push('/login'),
        goToAllStocksPage: () => push('/allstocks'),
        logout: () => thunkUser.logout()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
