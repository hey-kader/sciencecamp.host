import React, {useState, useEffect} from "react"
import './css/Feed.css'

function Feed () {


  const style = {
    background: 'orange',
    borderRadius: '8px',
    borderStyle: 'solid tomato',
  }

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
      data.posts.forEach((item) => {
        var element = document.createElement("div")

        var heading = document.createElement("h3")
        var usernameLabel = document.createElement("h4")
        var content = document.createElement("p")

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
        element.setAttribute('style', style)
        element.setAttribute('id', 'post')
        entryNode.append(element)
        
      })
    })
  })
  useEffect(() => {
    const opts = {
      "method": "GET",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        
      })
    }
    setInterval(1000, (() => {
      fetch("https://sciencecamp.host/posts", opts)
      .then((response) => response.json())
      .then((data) => {
        window.alert(data.length)
        })
      })
    )
  },[posts])

  return (
    <>
      <h1 id="feed" >feed</h1>  
    </>
  )
}
export default Feed
