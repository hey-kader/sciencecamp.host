import React, {useRef, useEffect} from "react"
function Upload () {
  const img = useRef()
  useEffect(() => {
    if (window.localStorage.getItem("avatar")) {
      var img = document.createElement("img")
      img.setAttribute('src', window.localStorage.getItem("avatar"))
      img.setAttribute('width', '180px')
      img.setAttribute('height', '180px')
      img.style.borderStyle = "solid 1px"
      img.style.borderRadius = "12px"
      document.querySelector("legend#entry").append(img)
      document.getElementById("img-upload").remove()
    }
  },[])
  return (
  <form enctype="multipart/form-data" action="/upload" onSubmit={(e) => {
      e.preventDefault() 
  }}>
    <legend id="entry" style={{"borderRadius": "14px", "borderColor": "tomato"}} >{window.localStorage.getItem("username")}</legend>
    <input name="avatar" ref={img} type="file" id="img-upload" onChange={(e) => {
      const file = document.getElementById("img-upload").files[0]
      const data = new FormData()
      data.append('avatar', file, file.name)
      window.localStorage.setItem("avatar", URL.createObjectURL(file))
      const opts = {
        "method":"POST",
        body: data 
      }
      fetch("https://sciencecamp.host/upload", opts)
        .then ((response) => response.json())
        .then ((_data) => {
          console.log(_data.msg)
          if (_data.msg) {
            var img = document.createElement("img")
            img.setAttribute('src', window.localStorage.getItem("avatar"))
            img.setAttribute('width', "190px")
            img.setAttribute('height', "190px")

            img.style.borderStyle = "solid 1px"
            img.style.borderRadius = "12px"
          }

          // append success message
          var h = document.createElement("h6")
          var tn = document.createTextNode(_data.msg)
          h.appendChild(tn)
          document.querySelector("legend#entry").append(img)
          document.getElementById("img-upload").remove()
        })
    }} />
  </form>
  )
}
export default Upload
