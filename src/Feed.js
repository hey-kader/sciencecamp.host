import React, {useState, useEffect} from "react"

function Feed () {


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

        element.append(heading) 
        element.append(usernameLabel)
        element.append(content)
        let entryNode = document.getElementById("feed")
        entryNode.append(element)
        console.log(item)
      
      })
    })
  },[])

  return (
    <>
      <h1 id="feed" >feed</h1>  
      <p>{posts}</p>
    </>
  )
}
export default Feed
