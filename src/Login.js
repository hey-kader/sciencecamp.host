import React, {useRef, useState, useEffect} from 'react'
import bcrypt from 'bcryptjs'
import './Login.css'



function Login () {
	const pass = useRef();
	const user = useRef();

	const [username, setUsername] = useState("");


	const [salt, setSalt] = useState("");
	const [hash, setHash] = useState("");



	const style = {
		borderStyle: "groove",
		margin: "auto",
		padding: "15px",
		display: "inline|flex",
		height: "2.9rem",
		width: "8.9rem",
		color: 'blue'
	}


		return (
			<div>
				<h2 style={{background: 'blue'}}>login</h2>

			<div id="login">
				<form style={style} onSubmit={
					(event) => {
						console.log("lotzo!")
						event.preventDefault()
						
						document.getElementById("submit").style.backgroundColor = "orange" 
						document.getElementById("username").style.borderStyle = "groove"

						console.log(user.current.value)
						console.log(pass.current.value + user.current.value)
						console.log(String(bcrypt.hashSync(user.current.value+pass.current.value)))
						console.log(document.getElementById("hash").innerHTML)
						document.getElementById("hash").innerHTML= String(bcrypt.hashSync(user.current.value+pass.current.value))
						const opts = {
							method: "POST",
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify({hash: String(bcrypt.hashSync(user.current.value+pass.current.value))})
						}
						fetch('http://192.168.1.30:3000/login/auth/', opts)
							.then(response => response.json())
							.then(data => console.log(data))

					// make a post request

					}
				}>

					<input ref={user} onChange={() => setUsername(username, user.current.value)} type="username" id="username" placeholder="<username here>"/>
				<input ref={pass} type="password" placeholder="<password there>" />
					<button type="submit" value="submit" id="submit" hidden >submit</button>
				<div id="hash"></div>
				<br />
				</form>
			</div>
		</div>
		);
}

export default Login
