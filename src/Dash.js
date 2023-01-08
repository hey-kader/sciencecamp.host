import {useNavigate} from "react-router-dom"

function Dash () {

	let navigation = useNavigate()

	return (
		<div>
			<code>
				<p>logged in</p>
				<button onClick={() => navigation('/')}>logout</button>
			</code>
		</div>
	)
}

export default Dash
