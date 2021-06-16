import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LogoutCallback } from "./modules/Auth/LogoutCallback";
import { Logout } from "./modules/Auth/Logout"
import { Callback } from "./modules/Auth/Callback"
import { SilentRenew } from "./modules/Auth/SilentRenew"
import Login from "./modules/login/Login";
import DashBoard from "./modules/main/DashBoard";
import LoginRedirect from "./modules/Auth/LoginRedirect";
import { AuthConsumer } from "./modules/Auth/AuthProvider";
import UserPage from "../src/modules/main/UserPage";

export const PrivateRoute = ({ component, ...rest }) => {
    const renderFn = (Component) => (props) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                if (!!Component && isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    signinRedirect();
                    return <span>loading</span>;
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)} />;
};

const Routes = () => {
	return ( 
		<BrowserRouter basename={'/'}>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/loginRedirect" component={LoginRedirect} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path='/signin-oidc' component={Callback} />
				<Route exact path='/silentrenew' component={SilentRenew} />

				<Route exact path="/logout/callback" component={LogoutCallback} />
				<Route exact path="/" component={DashBoard} />
				<PrivateRoute path="/private" component={UserPage} />
			</Switch>
		</BrowserRouter>
	 );
}
 
export default Routes;