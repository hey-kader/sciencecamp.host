import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"

function Dash () {

	let navigation = useNavigate()
	const [name, setName] = useState()

	useEffect (()=> {
		console.log(localStorage.username)	
		setName(name, localStorage.username)
	}, [])

	return (
		<div>
			<code>
				<p>logged in</p>
				<p>{name ? "" : name}</p>
			</code>

			<button onClick={() => {
				localStorage.setItem("password", "")
				navigation('/')
			}}>logout</button>
		</div>
	)
}

export default Dash
