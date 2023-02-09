import React, {useState, useEffect} from "react"
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

        element.style.backgroundColor = item.color
        element.style.width = window.innerWidth
        let usernameTextNode = document.createTextNode(item.username)
        let titleTextNode = document.createTextNode(item.title)
        let textTextNode = document.createTextNode(item.text)

        heading.appendChild(titleTextNode)
        usernameLabel.appendChild(usernameTextNode)
        content.appendChild(textTextNode)

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
        if (document.getElementById("postcount").innerHTML != data.posts.length) {
          document.getElementById("postcount").innerHTML = "posts: " + data.posts.length
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
          <br />
          <br />
        <div>

          <p id="postcount"></p>
        </div>
        <h1 id="feed" >feed</h1>  
      </div>
  )
}
export default Feed
