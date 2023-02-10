import {Link, useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import Post from "./Post.js"
import Feed from "./Feed.js"
import './css/Dash.css'

function Dash () {

	let navigation = useNavigate()

	const [name, setName] = useState()
	const [users, setUsers] = useState()
  const [online, setOnline] = useState()

  useEffect(() => {
    const opts = {
      method: "POST", 
      headers: {
        "Content-Type":"application/json"
       },
      body: JSON.stringify({
        username: window.localStorage.getItem("username")
      }) 
    }
    fetch('https://sciencecamp.host/online', opts) 
      .then((response) => response.json())
      .then((data) => {
        console.log(data) 
      })
    window.addEventListener("beforeunload", function (e) {
      //e.preventDefault() 
      e.returnValue = ''
      //new
        const opts = {
          "method": "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: localStorage.getItem("username")
          })
        }
        fetch("https://sciencecamp.host/offline", opts)
          .then((response) => response.json())
          .then((data) => console.log(data))
    })
  document.querySelectorAll("h6").forEach((element) => {
    element.remove()
  })
  },[])

	return (
		<>
    <Link to="/feed"> feed </Link>
    <Link to="/search"> search </Link>
    <Link to="/logout"> logout </Link>
    <h3 id="postcount"></h3>
      <div id="dashboard">
        <h2 id="username" >{window.localStorage.getItem("username")}</h2>
        <div id="userlist"></div>

        <div id="posts">
          <Post />
        </div>

    </div>
  </>
	)
}

export default Dash
