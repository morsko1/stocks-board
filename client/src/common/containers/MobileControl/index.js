import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionsUser from '~/User/actions';
import * as thunkUser from '~/User/thunks';
import MobileControlView from './component.js';
import * as navigation from '~/common/navigation.js';

class MobileControl extends Component {
    render() {
        return (
            <MobileControlView
                goToHomePage={this.props.goToHomePage}
                goToRegisterPage={this.props.goToRegisterPage}
                goToLoginPage={this.props.goToLoginPage}
                goToAllStocksPage={this.props.goToAllStocksPage}
                goToWatchListPage={this.props.goToWatchListPage}
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
        goToHomePage: navigation.goToHomePage,
        goToRegisterPage: navigation.goToRegisterPage,
        goToLoginPage: navigation.goToLoginPage,
        goToAllStocksPage: navigation.goToAllStocksPage,
        goToWatchListPage: navigation.goToWatchListPage,
        logout: () => thunkUser.logout(),
        toggleMenu: () => actionsUser.toggleMenu(),
        showMenu: () => actionsUser.showMenu(),
        hideMenu: () => actionsUser.hideMenu()
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MobileControl);
