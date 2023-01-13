import React, {useRef, useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import bcrypt from 'bcryptjs'
import './css/Login.css'

function Login () {

	const pass = useRef();
	const user = useRef();
	let navigation = useNavigate()

	const [username, setUsername] = useState("");
	useEffect (() => {
		if (localStorage.getItem("username")) {
			document.getElementById("username").innerHTML = localStorage.getItem("username")
		}
	}, [])

	const [salt, setSalt] = useState("");
	const [hash, setHash] = useState("");

	const style = {
		margin: "4rem",
		display: "inlineBlock",
		padding: "0.8rem 0.8rem 0 0.8rem",
		background: "red",
		opacity: "40%"
	}

		return (
			<div>
			<div id="login">

					<p>hi</p>
					<form style={style} onSubmit={
					(event) => {
						event.preventDefault()
						document.getElementById("submit").style.backgroundColor = "orange" 
						document.getElementById("username").style.borderStyle = "groove"

						const opts = {
							method: "POST",
							headers: {'Content-Type': 'application/json'},

							body: JSON.stringify({
								username: user.current.value, 
								password: bcrypt.hashSync(pass.current.value),
								created: Date(), latest: Date()
							})
						}

						fetch('http://172.20.10.8:3000/login/auth/', opts)
							.then(response => response.json())
							.then(data => {
								console.log(data)
								const login = bcrypt.compareSync(pass.current.value, data.passhash)
								if (login == true) {

									// set cookie here
									console.log(user.current.value)
									localStorage.setItem("username", user.current.value)
									localStorage.setItem("password", data.passhash)

									navigation('/dash')
								}
								else if (data.errmesg){
									document.getElementById('hash').innerHTML = data.errmesg
								}
							})
						// make a post request
					}
				}>
				<Link to="/login">
					<legend className="login-legend">
						<h2 style={{color: 'lightgrey', background: 'red', opacity: '95%'}}>
							login
						</h2>
					</legend>
				</Link>
				<Link to="/register">
					<legend className="register-legend">
						<h2 style={{color: 'lightgrey', background: 'red', opacity: '95%'}}>
							register
						</h2>
					</legend>
				</Link>
				<input ref={user} onChange={() => setUsername(username, user.current.value)} type="username" id="username" />
				<br />
				<input ref={pass} type="password" />
				<br />
				<br />
				<input type="submit" value="submit" id="submit"/>
				<Link id="reset" to="/login/reset">
					<legend>
						<h5 style={{ float: "left", fontSize: "50%",border: "none",color: 'lightgrey', background: 'red', opacity: '95%'}}>
							forgot my password
						</h5>
					</legend>
				</Link>

					
				</form>

			</div>
				<div id="hash"></div>
		</div>
		);
}

export default Login
