import React from "react"
import {useNavigate} from "react-router-dom"
import "./css/Reset.css"

function Reset () {

	var navigate = useNavigate()

	return (
		<div id="reset-wrapper">

			<form action="post" onSubmit={() => console.log('submitted')}>
				<input style={{padding: "3px", margin: "10px 8px"}} type="submit" value=" x " onClick={() => navigate('/login')} />
				<legend>reset password</legend>
				<input type="password" placeholder="password reset" />
				<input type="password" placeholder="confirm" />

				<input type="submit" onClick={() => navigate('/thanks')}/>

			</form>
		</div>
	)

}

export default Reset;
