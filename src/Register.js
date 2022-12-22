import react from "react"
import "./Register.css"

function Register () {

	const style = {
		borderStyle: "groove",
		margin: "auto",
		padding: "5px",
		height: "3.6rem",
		width: "9.1rem"
	}
		return (
				<div>
					<h2>register</h2>
					<br />
					<div id="register">
						<form style={style} action="post" onSubmit={(e) => {
							e.preventDefault()
							console.log('submitted registration!')}
						}>
							<input type="username" placeholder="<username>" />
								<br />
								<input type="password" placeholder="<password>" required />
								<br />
								<input type="password"  placeholder="<(confirm)>" required />
								<br />
								<input type="submit" hidden />
						</form>
					</div>
				</div>
		)
}

export default Register
