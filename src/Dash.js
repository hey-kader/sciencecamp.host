import {Link, useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import Post from "./Post.js"
import Upload from "./Upload.js"
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
    fetch('https://kader.pub/online', opts) 
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
        fetch("https://kader.pub/offline", opts)
          .then((response) => response.json())
          .then((data) => console.log(data))
    })
  document.querySelectorAll("h6").forEach((element) => {
    element.remove()
  })
  },[])
  useEffect(() => {
  const opts = {
    "method": "get",
    headers: {
      "Content-Type": "application/json"
    }
  }
  function checkposts () {
    fetch("https://kader.pub/posts", opts)
    .then ((response) => response.json())
    .then((data) => {
      console.log(data.posts)
      console.log('length test: ' + data.posts.length)
      console.log('length test2 ' + window.sessionStorage.getItem("postcount"))
      if (window.sessionStorage.getItem("postcount") != data.posts.length) {
        console.log('new post!')
        //data.posts[data.posts.length - 1]
        function appendPost(post) {
          const enter = document.getElementById("username")
          var node = document.createElement("div")
          var nodeTextElement = document.createTextNode("new post from "+post.username)
          node.appendChild(nodeTextElement)
          enter.append(node)
        }
        appendPost(data.posts[data.posts.length - 1])
        window.sessionStorage.setItem("postcount", data.posts.length)
				document.getElementById('postcount').innerHTML = data.posts.length + '(+ 1)'
      }
    })
  }

  }, [])

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
        <div id="upload">
          <Upload />
        </div>

    </div>
  </>
	)
}

export default Dash
