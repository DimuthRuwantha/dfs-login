import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';

const UserPage = () => {
	const [userProfile, setProfile] = useState( null );

	useEffect(() => {
		async function test(){
			const authService = new AuthService()
			const usr = await authService.getUser();
			const { expires_at, profile } = usr;
			const date = new Date( expires_at * 1000);
			setProfile( { ...profile, expires_at : date.toLocaleString() } );
		}
		test();
	}, []);

	return ( 
	<div>
		<div>User details : {userProfile?.name} </div>
		<div>Token Expires at : {userProfile?.expires_at} </div>	
	</div> );
}
 
export default UserPage;