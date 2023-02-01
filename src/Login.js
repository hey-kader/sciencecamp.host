import React, {useRef, useState, useEffect} from 'react'
import {useCookies} from "react-cookie"
import {Link, useNavigate} from "react-router-dom"
import bcrypt from 'bcryptjs'
import './css/Login.css'

function Login () {

	const [cookies, setCookie] = useCookies(['username'], ['password'], ['connect.sid'], ['id'])
		useEffect (()=> {
			console.log('cookies!')
			console.log(document.cookie)
			console.log(cookies)
		
	},[])

	const pass = useRef();
	const user = useRef();

	let navigation = useNavigate()
	useEffect(() => {
		user.current.value = localStorage.getItem("username")
		if (window.localStorage.getItem("password")) {
			setPassword(password, localStorage.getItem("password"))
			navigation('/dash')
		}
	},[])


	const [username, setUsername] = useState("");
	useEffect (() => {
			setUsername(username, user.current.value)
	}, [user])

	const [password, setPassword] = useState("");
	useEffect (() => {

		
	}, [pass])


	const [salt, setSalt] = useState("");
	const [hash, setHash] = useState("");

	const style = {
		margin: "4rem",
		display: "inlineBlock",
		padding: "0.8rem 0.8rem 0 0.8rem",
		background: "red",
		opacity: "55%"
	}

		return (
			<div>
				<div id="login">

					<form style={style} onSubmit={
					(event) => {
						event.preventDefault()
						document.getElementById("submit").style.backgroundColor = "orange" 
						document.getElementById("username").style.borderStyle = "groove"

						const opts = {
							method: "POST",
							headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								username: user.current.value, 
								password: bcrypt.hashSync(pass.current.value),
								latest: Date()
							}),
						}
						fetch('https://sciencecamp.host/login/auth/', opts)
							.then((response) => response.json())
							.then((data) => {

								console.log('data')
								console.log(data)
								const login = bcrypt.compareSync(pass.current.value, data.password)
								console.log(login)
								if (login == true) {

                  if (window.localStorage.getItem("username") != data.username) {
                    window.localStorage.setItem("username", data.username)
                  }
									window.localStorage.setItem("password", data.password)
									
									// set cookie here
									// document.cookie = data.password

									console.log(user.current.value)
									console.log(data)
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
				<input ref={pass} onChange={()=> setPassword(password, pass.current.value)}type="password" />
				<br />
				<br />
				<input type="submit" value="submit" id="submit"/>
				<Link id="reset" to="/login/reset">
					<legend>
						<h5 onClick={()=>console.log(document.cookie)} style={{ float: "left", fontSize: "50%",border: "none",color: 'lightgrey', background: 'red', opacity: '95%'}}>
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
