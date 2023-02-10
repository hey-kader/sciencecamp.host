import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import './css/Feed.css'

function Feed () {

  const style = {
    background: 'orange',
    borderRadius: '8px',
    borderStyle: 'solid tomato',
  }

//new
  const [postCount, setPostCount] = useState()
//new
  const [posts, setPosts] = useState()
  useEffect (() => {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }
    fetch('https://sciencecamp.host/posts', opts) 
    .then((response) => response.json())
    .then((data) => {
      console.log(data.posts)
      setPosts(posts, data.posts)
      for (var i = 0; i < data.posts.length; i++) {
        const item = data.posts[data.posts.length - 1 - i]
        var element = document.createElement("div")

        var heading = document.createElement("h3")
        heading.setAttribute("id", "post-heading")
        var usernameLabel = document.createElement("h4")
        usernameLabel.setAttribute("id", "post-user")
        var content = document.createElement("p")
        content.setAttribute("id", "post-content")

        function relativeDate (datestr) {
          var epochdiff = Date.now() - Date.parse(datestr)
          epochdiff = epochdiff/60/60/60
          return Math.trunc(epochdiff) + "m ago"
        }

        var timestamp = document.createElement("p")
        var timestampTextNode = document.createTextNode(relativeDate(item.created))
        timestamp.appendChild(timestampTextNode)
        timestamp.setAttribute('id', 'timestamp')

        element.style.backgroundColor = item.color
        element.style.width = window.innerWidth
        let usernameTextNode = document.createTextNode(item.username)
        let titleTextNode = document.createTextNode(item.title)
        let textTextNode = document.createTextNode(item.text)

        heading.appendChild(titleTextNode)
        usernameLabel.appendChild(usernameTextNode)
        content.appendChild(textTextNode)

        element.append(timestamp)
        element.append(usernameLabel)
        element.append(heading) 
        element.append(content)

        let entryNode = document.getElementById("feed")
        /* (new) this has been giving me problems
        element.setAttribute('style', {style})
        */
        element.setAttribute('id', 'post')

        entryNode.append(element)
        
      }
    })
  document.querySelectorAll("h6").forEach((element) => {
    element.remove()
  })
  },[posts])
  useEffect(() => {
    const opts = {
      "method": "GET",
      headers: {
        "Content-Type": "application/json" 
      }
    }
    setInterval((() => {
      fetch("https://sciencecamp.host/posts", opts)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.posts.length)
        if (window.sessionStorage.getItem("postcount")!= data.posts.length) {
          document.getElementById("postcount").style.color = "tomato"
          document.getElementById("postcount").innerHTML = "new posts "
        }
        //new
        /*
          create a new element, appendChild(document.createTextNode(data.posts[data.posts.length - 1]))
        */
      })
    }),1000)
  },[posts])

  return (
      <div>
        <Link to="/dash">Dash</Link>
          <br />
          <br />
        <div>
          <h3 id="postcount"></h3>
        </div>
        <h1>feed</h1>  
        <div id="feed"></div>
      </div>
  )
}
export default Feed
