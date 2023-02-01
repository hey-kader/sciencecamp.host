import React, {useState, useEffect} from "react"

function Feed () {


  const [posts, setPosts] = useState()
  useEffect (() => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch('/posts', opts) 
    .then((response) => {
      response.json()
    })
    .then((data) => {
      setPosts(posts, data.posts)
      console.log(posts)
    })
  },[])

  return (
    <h1>feed</h1>  
  )
}
export default Feed
