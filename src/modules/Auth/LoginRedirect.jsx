import { AuthConsumer } from "./AuthProvider";

const LoginRedirect = () => {
	return ( 
		<AuthConsumer>{
			({ isAuthenticated, signinRedirect }) => {
                if(!isAuthenticated()){
					signinRedirect();
				}
				else{
					window.location.replace("/");
				}
				return <div></div>
			}
		}
        </AuthConsumer>
	 );
}
 
export default LoginRedirect;