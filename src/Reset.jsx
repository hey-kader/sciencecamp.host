import React from "react"
import {useNavigate} from "react-router-dom"
import "./css/Reset.css"

function Reset () {

	var navigate = useNavigate()

	return (
		<div id="reset-wrapper">
			<form action="post" onSubmit={() => console.log('submitted')}>
				<legend>reset password</legend>
				<input type="password" placeholder="password reset" />
				<input type="password" placeholder="confirm" />
				<input type="submit" onClick={() => navigate('/thanks')}/>
			</form>
		</div>
	)

}

export default Reset;
