import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


function That () {	
	let navigate = useNavigate();
	return (
		<div id="that">
			<aside>
				<button onClick={() => {navigate('/menu')}}>X</button>
			</aside>
			<div id="img">
				<h3>that</h3>
			</div>
			<hr />

		</div>
	)
}
export default That;
