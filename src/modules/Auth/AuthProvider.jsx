import React, {Component} from "react";

import AuthService from "../../services/AuthService";

const AuthContext = React.createContext({
    signinRedirect: () => ({}),
    signinRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinSilentCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    createSigninRequest: () => ({})
});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
    authService;
    constructor(props) {
        super(props);
        this.authService = new AuthService();
		
    }

    render() {
		return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>
    }
}