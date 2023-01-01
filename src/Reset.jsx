import React from "react"
import {useNavigate} from "react-router-dom"

function Reset () {

	var navigate = useNavigate()

	return (
		<div id="reset-wrapper">
			<button onClick={() => navigate('/login')}>back</button>
			<br />
			<code>hi</code>
		</div>
	)

}

export default Reset;
