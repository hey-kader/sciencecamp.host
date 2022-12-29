import {useState} from "react"
import "./css/Register.css"
import {bcryptjs} from "bcryptjs" 
import Login from "./Login"
import {Link} from "react-router-dom"

function Register () {

	const [toggle, setToggle] = useState()

		const style = {
			margin: "auto",
			display: "inlineBlock",
			padding: "0.8rem 0.8rem 0 0.8rem",
		
			background: "red",
			opacity: "40%"
		}

		return (
				<div>

						<form style={{style}} action="post" onSubmit={(e) => {
							e.preventDefault()
							console.log('submitted registration!')
							setToggle(toggle+1)
						}}>
					<Link to="/register">
						<legend><h2>register</h2></legend>
					</Link>
					<Link to="/login">
						<legend><h2 class="sub" style={{opacity: "20%", fontSize: "10px"}}>login</h2></legend>
					</Link>
					<br />

					<input type="username" />
						<br />
						<input type="password" required />
						<br />
						<input type="password"   required />
						<br />
						<br />
						<input id="submit" type="submit" />
						<br />
					</form>
					</div>
		)
}

export default Register
