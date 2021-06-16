/* 
Implementation based on https://medium.com/@franciscopa91/how-to-implement-oidc-authentication-with-react-context-api-and-react-router-205e13f2d49
*/

import { UserManager, WebStorageStateStore, Log } from "oidc-client";

const IDENTITY_CONFIG = {
    authority: "identity server",
    client_id: "<your client id>", 
    redirect_uri: "http://localhost:3000/signin-oidc",
    post_logout_redirect_uri: "http://localhost:3000/Login",
	automaticSilentRenew : true,
	silent_redirect_uri : "http://localhost:3000/silentrenew",
    response_type: "",
    scope: "",
	grant_type : ""
};

export default class AuthService {
    UserManager;
    
    constructor() {
		this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({ store: window.localStorage }),
        });
        // Logger
        Log.logger = console;
        Log.level = Log.DEBUG;
        this.UserManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                this.navigateToScreen();
            }
        });
        this.UserManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signinSilent();
        });
    }

    signinRedirect = () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        this.UserManager.signinRedirect({});
    };

    signinRedirectCallback = () => {
        this.UserManager.signinRedirectCallback()
        .then( result => {
            this.navigateToScreen()
          })
          .catch((err) => {});
    };

    signinSilent = async() => {
        await this.UserManager.signinSilent();
    };

    signinSilentCallback = () => {
        this.UserManager.signinSilentCallback();
    };

    createSigninRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = async() => {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
		localStorage.removeItem( 'usersession');
    };

    signoutRedirectCallback = () => {
        this.UserManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
        	window.location.replace(`/login`);
        });
        this.UserManager.clearStaleState();
    };  

    getUser = async () => {
        const user = await this.UserManager.getUser();
        if (!user) {
            return await this.UserManager.signinRedirectCallback();
        }
        return user;
    };

    parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    navigateToScreen = () => {
        window.location.replace(`/private`);
    };

	isAuthenticated = () => {
        const oidcStorage = JSON.parse(localStorage.getItem(`oidc.user:${IDENTITY_CONFIG.authority}:${IDENTITY_CONFIG.client_id}`))
        return (!!oidcStorage && !!oidcStorage.access_token)
    };
}

