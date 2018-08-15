import React from 'react'
import { Redirect } from 'react-router-dom'
import { signOut } from '../actions/auth'

import '../../css/App.css';

const SignOut = () => (
	<div>
	Please wait... signing out!!!
	{
	  signOut().then((res) => {
  		return <Redirect to="/sign-in"/>
	  })
	}
	</div>
)

export default SignOut;