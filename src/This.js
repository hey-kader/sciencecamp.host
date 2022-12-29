import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Form from './Form'

function This () {	
	let navigate = useNavigate()
	return (

		<div id="this">
			<div>
				<Form />
			</div>
		</div>
	)
}
export default This;
