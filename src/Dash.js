import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import Post from "./Post.js"
import Feed from "./Feed.js"
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
				online.push(item)
			})

			// create an ordered list of users
			const usersNode = document.querySelector("div#userlist")
			for (let i = 0; i < online.length; i++) {
				const element = document.createElement("h5")

				// new
				element.style.color = "black"
				element.style.borderRadius = "5%"
				element.style.background = "lightgray"
				
				const text = document.createTextNode(online[i].username)
				element.appendChild(text)
				element.addEventListener("mouseover", (() => {
					element.innerHTML = element.innerHTML + "\nvisits: " + online[i].visits + "\tcreated: \t" + online[i].created
				}))
				element.addEventListener("mouseout", (() => {
					element.innerHTML = online[i].username
				}))
				usersNode.append(element)
			}
			// end
		})
		setName(name, window.localStorage.getItem("username"))

    /* hide the 'login' 'register' 'home' <Link>s, brought to you by react-router-dom (v6?) */
		document.querySelectorAll("h6").forEach ((element) => {
			element.style.display = "none"
		})
	}, [])
  const [online, setOnline] = useState()
  useEffect(() => {
    const opts = {
      method: "POST", 
      headers: {
        "Content-Type":"application/json"
       },
      body: JSON.stringify({
        username: sessionStorage.getItem("username")
      }) 
    }
    fetch('https://sciencecamp.host/online', opts) 
      .then((response) => response.json())
      .then((data) => {
        console.log(data) 
      })
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault() 
      //e.returnValue = ''
      //new
        const opts = {
          "method": "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: sessionStorage.getItem("username")
          })
        }
        fetch("https://sciencecamp.host/offline", opts)
          .then((response) => response.json())
          .then((data) => console.log(data))
    })
  },[])

	return (
		<>
			<button onClick={() => {
				window.localStorage.setItem("password", "")
				navigation('/login')
			}}>
				logout
			</button>
			<div id="dashboard">
				<h2 id="username" >{window.localStorage.getItem("username")}</h2>
				<div id="userlist"></div>
			</div>
      <div id="post">
        <Post />
      </div>
      <div id="feed">
        <Feed />
      </div>
		</>
	)
}

export default Dash
