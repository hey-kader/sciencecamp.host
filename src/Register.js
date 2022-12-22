import react from "react"
import "./Register.css"

function Register () {
		return (
			<div id="register">
				<form action="post" onSubmit={(e) => {
					e.preventDefault()
					console.log('submitted registration!')}
				}>
					<input type="username" placeholder="<username>" />
						<br />
						<input type="password" placeholder="<password>" required />
						<br />
						<input type="password"  placeholder="<(confirm)>" required />
						<br />
						<input type="submit" />
				</form>
			</div>
		)
}

export default Register
