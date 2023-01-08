import React from "react"
import {useNavigate} from "react-router-dom"
import "./css/Reset.css"

function Reset () {

	var navigate = useNavigate()

	const style = {
		margin: "4rem"
	}

	return (
		<div id="reset-wrapper">

			<form style={style} action="post" onSubmit={(e) => {
				e.preventDefault()
				console.log('submitted')
				navigate('/thanks')
			}
			}>
				<input style={{padding: "3px", margin: "10px 8px"}} type="submit" value=" x " onClick={() => navigate('/login')} />
				<br />
				<legend>reset password</legend>
				<br />

				<input id="username" type="username" placeholder="username" />
				<br />

				<input type="submit" id="submit" disabled />
				<br />
				

			</form>
		</div>
	)

}

export default Reset;
