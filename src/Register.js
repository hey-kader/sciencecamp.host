import {useState, useRef} from "react"
import "./css/Register.css"
import bcrypt from "bcryptjs" 
import Login from "./Login"
import {Link, useNavigate, useEffect} from "react-router-dom"
import {useCookies} from "react-cookie" 

function Register () {

	const [toggle, setToggle] = useState()

	let navigation = useNavigate()
	const [cookies, setCookie] = useCookies(['user'])

	function userCookie () {
		setCookie('username', user.current.value, {path: '/register'})
	}

	function passwordCookie (ph) {
		setCookie('password', ph, {path: '/register'})
	}
	

	const user = useRef()
	const pass = useRef()

	const confirm = useRef()

		const style = {

			margin: "4rem",
			display: "inlineBlock",
			padding: "0.8rem 0.8rem 0 0.8rem",

		}

		function validate () {

			var p1 = confirm.current.value
			var p2 = pass.current.value

			if (p1 == p2 && p1 != "") {

				document.getElementById('password').style.color = "green"
				document.getElementById('confirm').style.color = "green"
				console.log('color: green')
				document.getElementById("submit").disabled = false
				document.getElementById("submit").style.background = "lime"

			}
			else {

				document.getElementById('password').style.color = "red"
				document.getElementById('confirm').style.color = "red"
				console.log('color: red')
				document.getElementById("submit").disabled = true
				document.getElementById("submit").style.background = "#f2bf50"

			}

		}

		return (
				<div id="register" >
					<form onChange={() => validate()} style={style} action="post" onSubmit={(e) => {

							e.preventDefault()
							localStorage.setItem("username", user.current.value)
							const opts = {
								method: "POST",
								headers: {
								'Content-Type': 'application/json'
								},

								body: JSON.stringify({
									username: user.current.value, 
									password: bcrypt.hashSync(pass.current.value),
									created: Date(),
									latest: Date()
								})
							}
							fetch ('http://172.20.20.20:3000/register/auth/', opts)
								.then(response => response.json())
								.then(data => {
									console.log(data)
									setCookie("password", data.passhash, {path: '/'})
									if (data.exists == true) {

										document.getElementById("console").innerHTML = "user exists (incorrect password)"

										pass.current.value = ""
										confirm.current.value = ""

									}
									else if (data){

										// document.getElementById("console").innerHTML = data 
										

										navigation('/login')


									}
								})
					}}>

						<Link to="/register">
							<legend>
								<h2>register</h2>
							</legend>
						</Link>

						<Link to="/login">
							<legend>
								<h2 class="sub" style={{color: "white", float: "left", fontSize: "10px"}}>login</h2>
							</legend>
						</Link>



						<input ref={user} type="username" id="username" placeholder="registrant" required />
						<br />
						<input ref={pass} type="password" id="password"   placeholder="password" required />
						<br />
						<input ref={confirm} id="confirm" type="password" placeholder="confirm" required />

						<br />

						<input id="submit" type="submit" disabled />
						<code>{document.cookie ? document.cookie.password : "no cookie"}</code>

						<br />
					</form>
					<br />
					<code id="console"></code>
					<br />
					<p id="valid"></p>
				</div>
		)
}

export default Register
