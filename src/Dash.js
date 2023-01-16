import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import './css/Dash.css'

function Dash () {

	let navigation = useNavigate()
	const [name, setName] = useState()
	const [users, setUsers] = useState()
	useEffect(() => {
	const opts = {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			msg: 'requesting a list of all users from /dash via post req'
		}),
	}
	fetch('http://172.20.10.8:3000/dash', opts)
		.then((response) => response.json())
		.then((data) => {
			setUsers(users, data)
			console.log(users)

		})
	})

	useEffect (()=> {
		console.log(localStorage.username)	
		setName(name, localStorage.username)
	}, [])

	return (
		<>
			<br />
			<br />
			<div id="dashboard">
				<button onClick={() => {
					localStorage.setItem("password", "")
					navigation('/')
				}}>
					logout
				</button>
				<h2 id="username" >{window.localStorage.getItem("username")}</h2>
			</div>
		</>
	)
}

export default Dash
