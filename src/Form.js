import {React} from "react"

import Login from './Login'
import Register from './Register'

import {Link} from 'react-router-dom'

function Form () {

	return (
		<div class="wrapper">
			<h2>form</h2>
				<div class="inner-wrapper">
				<Link to="/login">
					<Login />
				</Link>
				<br />
				<Link to="/register">
					<Register />
				</Link>
			</div>
		</div>
)
}
export default Form;
