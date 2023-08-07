import React, {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

function Search () {

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
	fetch('https://kader.pub/dash', opts)
		.then((response) => response.json())
		.then((data) => {
			setUsers(users, data.users)
			let online = new Array ()
			data.users.forEach((item) => {
				online.push(item)
			})

			// create an ordered list of users
			const usersNode = document.querySelector("div#userlist")
			for (let i = 0; i < online.length; i++) {
				const element = document.createElement("h5")

				// new
				element.style.color = "orange"
        element.style.opacity = "60%"
				element.style.borderRadius = "0%"
        element.style.background = "linear-gradient(skyblue, skyblue, skyblue, lightblue)"
				
				const text = document.createTextNode(online[i].username)
				element.appendChild(text)
				element.addEventListener("mouseover", (() => {
					element.innerHTML = element.innerHTML + "\nvisits: " + online[i].visits + "\tcreated: \t" + online[i].created
				}))
				element.addEventListener("mouseout", (() => {
					element.innerHTML = online[i].username
				}))
        element.addEventListener("click", (() => {
        navigation('/dash/'+online[i].username)
        }))
				usersNode.append(element)
			}
		// end
		})
		setName(name, window.localStorage.getItem("username"))

    /* hide the 'login' 'register' 'home' <Link>s, brought to you by react-router-dom (v6?) */
    document.querySelectorAll("h6").forEach((element) => {
      element.remove()
    })
	}, [])
  return (
  <div id="search-wrapper">
    <Link to="/dash">back</Link>
    <div id="userlist"></div>
  </div>
  )
}

export default Search
