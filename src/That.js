import React from 'react'
import {useNavigate} from 'react-router-dom'


function That () {	
	let navigate = useNavigate();
	return (

		<div id="that">
			<br />
			<aside>
				<button onClick={() => {navigate('/menu')}}> ['x'] </button>
			</aside>
			<br />
			<div id="img">

				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
				<h3>filler text filler text filler text</h3>
			</div>
			<hr />

		</div>
	)
}
export default That;
