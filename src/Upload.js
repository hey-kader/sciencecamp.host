import React, {useRef, useEffect} from "react"
function Upload () {
  const img = useRef()
  return (
  <form enctype="multipart/form-data" action="/upload" onSubmit={(e) => {
      e.preventDefault() 
  }}>
    <legend>{window.localStorage.getItem("username")}</legend>
    <input name="avatar" ref={img} type="file" id="img-upload" onChange={(e) => {
      const file = document.getElementById("img-upload").files[0]
      const data = new FormData()
      data.append('avatar', file, file.name)
      const opts = {
        "method":"POST",
        body: data 
      }
      fetch("https://sciencecamp.host/upload", opts)
        .then ((response) => response.json())
        .then ((data) => {
          console.log(data)
        })
    }} />
  </form>
  )
}
export default Upload
