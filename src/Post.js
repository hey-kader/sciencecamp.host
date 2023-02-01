import React, {useRef} from "react"

function Post () {

  const text = useRef()
  const title = useRef()

  return (
    <div>
      <form method="post" onSubmit={(e) => {
      e.preventDefault()
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: window.localStorage.getItem("username"),
          title: title.current.value, 
          text: text.current.value
        })
      }
      fetch("https://sciencecamp.host/dash/post", opts)
        .then ((response) => response.json())
        .then ((data) => {
          console.log(data)
        })
      window.alert("sent!")
      }}>
        <legend>post!</legend>
        <input type="text" ref={title} />
        <br />
        <textarea ref={text} placeholder="your post here..." id="post" name="post" cols="30" rows="10">
        </textarea>
        anonymous? <input type="checkbox" />
        <br />
        <input type="submit" />
        <br />
      </form>
    </div>
  )

}
export default Post
