import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"

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
		<div>
			<code>
				<p>logged in</p>
				<h3>{name ? "" : name}</h3>
				<h3>{users ? "" : users}</h3>
			</code>

			<button onClick={() => {
				localStorage.setItem("password", "")
				navigation('/')
			}}>logout</button>
			<div id="users">
				<ol id="userArray">
					<li className="user"></li>
				</ol>
			</div>
		</div>
	)
}

export default Dash
