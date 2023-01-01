import React, {useNavigate}from "react"

function Reset () {

	return (
		<div id="reset-wrapper">
			<button onClick={useNavigate('/login')}>back</button>
			<code>hi</code>
		</div>
	)

}

export default Reset;
