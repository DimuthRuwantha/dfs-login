const Login = () => {

	const handleLoginClick = () => {
		console.log("redirect to DFS login");
		window.location.replace( "/loginredirect")
	}

	return ( <div>
		<button onClick={handleLoginClick}>Login using DFS</button>
	</div> );
}
 
export default Login;