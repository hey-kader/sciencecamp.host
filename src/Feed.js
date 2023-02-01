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
        console.log(item.title)
      })
    })
  },[])

  return (
    <>
      <h1>feed</h1>  
      <p>{posts}</p>
    </>
  )
}
export default Feed
