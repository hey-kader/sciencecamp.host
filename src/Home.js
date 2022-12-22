import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


function Home () {
	let navigate = useNavigate();
	return (
		<div id="home">
			<aside>
				<button onClick={() => {navigate('/menu')}}>X</button>
			</aside>
			<div>
				<h3>home</h3>
			</div>
			<br />
		</div>
	)
}
export default Home;
