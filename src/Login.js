import React, {useRef, useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import bcrypt from 'bcryptjs'
import './Login.css'

function Login () {
	const pass = useRef();
	const user = useRef();

	const [username, setUsername] = useState("");


	const [salt, setSalt] = useState("");
	const [hash, setHash] = useState("");



	const style = {
		margin: "auto",
		display: "inlineBlock",
		padding: "0.8rem 0.8rem 0 0.8rem",
	
		background: "red",
		opacity: "40%"
	}


		return (
			<div>


				<h2>login</h2>

				<h3>register</h3>

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
				<Link to="/">
					<legend><h2 style={{color: 'lightgrey', background: 'red', opacity: '90%'}}>login</h2></legend>
				</Link>

					<input ref={user} onChange={() => setUsername(username, user.current.value)} type="username" id="username" />
						<br />
				<input ref={pass} type="password" />
					<br />
					<br />
					<button type="radio" id="autologin"></button>
					<br />
					<input type="submit" value="submit" id="submit"/>
					
					
				<br />
				</form>

			</div>
				<div id="hash"></div>
		</div>
		);
}

export default Login
