import react, {useState} from "react"
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
					<div id="register">
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
								<br />
								<input type="image" />
								<input type="submit" hidden />
						</form>
					</div>
					<code>{toggle}</code>
				</div>
		)
}

export default Register
