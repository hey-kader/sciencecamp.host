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
fetch('http://172.20.20.20:3000/dash', opts)
		.then((response) => response.json())
		.then((data) => {
			setUsers(users, data.users)
			console.log(data.users)

			let online = new Array ()
			data.users.forEach((item) => {
				console.log(item.username)
				online.push(item.username)
			})
			console.log(online)
			document.getElementById("users").innerHTML = online

		})
	}, [])
	useEffect (()=> {
		console.log(window.localStorage.getItem("username"))	
		setName(name, window.localStorage.getItem("username"))
	}, [])

	return (
		<>
			<br />
			<br />
			<div id="dashboard">
				<button onClick={() => {
					localStorage.setItem("password", "")
					navigation('/login')
				}}>
					logout
				</button>
				<h2 id="username" >{window.localStorage.getItem("username")}</h2>
				<h3 id="users"></h3>
			</div>
		</>
	)
}

export default Dash
