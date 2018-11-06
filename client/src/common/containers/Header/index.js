import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as thunkUser from '~/User/thunks';
import HeaderView from './Header.js';
import * as navigation from '~/common/navigation.js';

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
        goToHomePage: navigation.goToHomePage,
        goToRegisterPage: navigation.goToRegisterPage,
        goToLoginPage: navigation.goToLoginPage,
        goToAllStocksPage: navigation.goToAllStocksPage,
        logout: () => thunkUser.logout()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
