import {useState} from "react"
import "./Register.css"
import {bcryptjs} from "bcryptjs" 

function Register () {

	const [toggle, setToggle] = useState()



	const style = {
		borderStyle: "groove",
		margin: "auto",
		padding: "5px",
		color: "grey"
	}
		return (
				<div>
					<h2 class="sub">register</h2>
					<h3>login</h3>
						<form style={style} action="post" onSubmit={(e) => {
							e.preventDefault()
							console.log('submitted registration!')
							setToggle(toggle+1)
						}}>
							<input type="username" placeholder="<username>" />
								<br />
								<input type="password" placeholder="<password>" required />
								<br />
								<input type="password"  placeholder="<(confirm)>" required />
								<input type="submit" />
						</form>
					</div>
		)
}

export default Register
