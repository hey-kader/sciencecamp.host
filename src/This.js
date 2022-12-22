import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function This () {	
	let navigate = useNavigate()
	return (
		<div id="this">
			<aside>
				<button onClick={() => {navigate('/menu')}}>X</button>
			</aside>
			<div id="img">
				<h3>this</h3>
			</div>
			<hr />
		</div>
	)
}
export default This;
