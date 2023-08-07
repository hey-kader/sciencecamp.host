import "./css/Post.css"
import React, {useRef, useEffect} from "react"

function Post () {

  const text = useRef()
  const title = useRef()
  const color = useRef()
  useEffect(() => {
    document.getElementById("colorpicker").defaultValue = "#f2bf50"
  },[])

  return (
    <div>
      <form id="postform" method="post" onSubmit={(e) => {
      e.preventDefault()
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: window.localStorage.getItem("username"),
          title: title.current.value, 
          text: text.current.value,
          color: color.current.value
        })
      }
      fetch("https://kader.pub/dash/post", opts)
        .then ((response) => response.json())
        .then ((data) => {
          console.log(data.msg)
        })
      // new
      window.location.href = "https://kader.pub/dash"

      title.current.value = ""
      text.current.value = ""
      }}>
        <legend>post!</legend>
        <input placeholder="title" type="text" ref={title} />
        <br />
        <textarea ref={text} placeholder="your post here..." id="post" name="post" cols="30" rows="10">
        </textarea>
        <br />
        <input id="colorpicker" ref={color} type="color" onChange={() => {
          document.getElementById("postform").style.background = color.current.value}
        } />
        <br />
        <input type="submit" />
        <br />
      </form>
        <br />
        <br />
    </div>
  )

}
export default Post
