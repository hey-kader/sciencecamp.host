import {useState, useRef} from "react"
import "./css/Register.css"
import {bcryptjs} from "bcryptjs" 
import Login from "./Login"
import {Link} from "react-router-dom"

function Register () {

	const [toggle, setToggle] = useState()

	const user = useRef()
	const pass = useRef()

		const style = {
			margin: "auto",
			display: "inlineBlock",
			padding: "0.8rem 0.8rem 0 0.8rem",
		
			background: "red",
			opacity: "40%"

		}

		return (
				<div>
						<form style={style} action="post" onSubmit={(e) => {

							e.preventDefault()
							const opts = {
								method: "POST",
								headers: {'Content-Type': 'application/json'},
								body: JSON.stringify({
									username: user.current.value,
									password: pass.current.value, 
									created: Date(),
									latest: Date()
								})
							}
							fetch ('http://192.168.1.30:3000/register/auth', opts)
								.then(response => response.json())
								.then(data => console.log(data))

						}}>

							<Link to="/register">
								<legend><h2>register</h2></legend>
							</Link>
							<Link to="/login">
								<legend><h2 class="sub" style={{opacity: "20%", fontSize: "10px"}}>login</h2></legend>
							</Link>
							<br />

							<input ref={user} type="username" id="username" />
							<br />
							<input type="password" required />
							<br />
							<input ref={pass} type="password" id="password"   required />

							<br />
							<br />

							<input id="submit" type="submit" />

							<br />
						</form>
					</div>
		)
}

export default Register
