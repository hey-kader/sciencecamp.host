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
	fetch('https://sciencecamp.host/dash', opts)
		.then((response) => response.json())
		.then((data) => {
			setUsers(users, data.users)
			let online = new Array ()
			data.users.forEach((item) => {
				online.push(item.username)
			})

			// create an ordered list of users
			const usersNode = document.querySelector("div#userlist")
			for (let i = 0; i < online.length - 1; i++) {
				const element = document.createElement("h5")
				// new
				element.style.color = "green"
				const text = document.createTextNode(online[i])
				element.appendChild(text)
				element.addEventListener("mouseover", (() => {
					window.alert(online[i])
				}))
				usersNode.append(element)
			}
			// end
		})
		setName(name, window.localStorage.getItem("username"))

		document.getElementById("register").style.visibility = "hidden"
		document.querySelectorAll("h6").forEach ((element) => {
			element.style.display = "none"
		})
	}, [])

	return (
		<>
			<div id="dashboard">
				<button onClick={() => {
					localStorage.setItem("password", "")
					navigation('/login')
				}}>
					logout
				</button>
				<h2 id="username" >{window.localStorage.getItem("username")}</h2>
				<div id="userlist"></div>
			</div>
		</>
	)
}

export default Dash
