import React from "react"
import {useNavigate} from "react-router-dom"

function Thanks () {

	const style = {
		background: "blue"
	}

	var navigate = useNavigate()

	return (
		<div id="thanks">
			<code>thanks!</code>
			<button style={style} onClick={() => navigate('/')}>return to home</button>
		</div>
	)
}


export default Thanks
