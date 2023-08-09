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
			msg: 'requesting a list of all users from /dash'
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
				const div = document.createElement ("div")
				div.style.border = "solid 1px"
				div.style.borderRadius = "5px"
				div.style.padding = "10px"
				div.style.margin = "10px"
				const element = document.createElement("h5")

				// new
				element.style.color = "orange"
        element.style.opacity = "80%"
				element.style.borderRadius = "13px"
				element.style.width = "185px"
				element.style.height = "90x"
				element.style.padding = "15px"
				element.style.margin = "15px"
        element.style.background = "linear-gradient(lightgray, silver, gray)"
				
				const text = document.createTextNode(online[i].username)

				/* 
					update: (8 8 23)
					we are going to hit the endpoint via

					<script>
					var url = 'https://kader.pub/api/'+online[i].username
					const opts = {
						method: "get",
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							msg: 'requesting each users (json) file for user previews',
						}),
					}
					fetch (url, opts)
					.then((response => response.json())
					.then((data) => {
						console.log(data.profilepic)
					})
					</script>
					
					var img = document.createElement("img")	
					img.src = "https://kader.pub/<user>/<img>"

					we need a program on the backend to serve /<user>/<profilepicepoch.png>,
					and we'll catch it by calling fetch(url, {data => data.json()})
				  set img.style.width and the like, and we'll be well on our way-
					(img.style.width, img.style.height, img.border, img.borderRadius, namely).
					
				*/
					
				element.appendChild(text)
				element.addEventListener("mouseover", (() => {
					element.innerHTML = element.innerHTML + "\nvisits: " + online[i].visits + "\tsince: " + online[i].created
					element.style.opacity = "100%"
				}))
				element.addEventListener("mouseout", (() => {
					element.style.opacity = "60%"
					element.innerHTML = online[i].username
				}))
        element.addEventListener("click", (() => {
        navigation('/dash/'+online[i].username)
        }))
				
				div.appendChild(element)
				var sub =  document.createElement('p')
				var api_hit = "https://kader.pub/api/"+online[i].username
				const tn = document.createTextNode(api_hit)
				sub.appendChild(tn)
				div.append(sub)
				
				usersNode.append(div)
				
				
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
    <Link to="/dash">return to dashboard</Link>
    <div id="userlist"></div>
  </div>
  )
}

export default Search
