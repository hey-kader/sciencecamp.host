import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import "./css/Reset.css"

function Reset () {

	var navigate = useNavigate()

	const [username, setUsername] = useState()
	useEffect(()=> {
		setUsername(username, window.localStorage.getItem("username"))
	})

	const style = {
		margin: "4rem"
	}

	return (
		<div id="reset-wrapper">

			<form style={style} action="post" onSubmit={(e) => {
				e.preventDefault()
				// fetch (/login/reset)
				const opts = {
					method:"POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"msg": "popingggg!"
					})
				}
				fetch("http://172.20.20.20:3000/login/reset", opts)
					.then((response) => response.json())
					.then((data) => {
						console.log(data)
					})
					console.log('submitted')
					navigate('/thanks')
				}
			}>
				<input style={{padding: "3px", margin: "10px 8px"}} type="submit" value=" x " onClick={() => navigate('/login')} />
				<br />
				<legend>reset password</legend>
				<br />

				<input value={window.localStorage.getItem("username")}id="username" type="username" />
				<br />

				<input type="submit" id="submit" />
				<br />
				

			</form>
		</div>
	)

}

export default Reset;
