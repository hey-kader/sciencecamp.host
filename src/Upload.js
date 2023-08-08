import React, {useRef, useEffect} from "react"
function Upload () {
  const img = useRef()
  useEffect(() => {
    if (window.localStorage.getItem("avatar")) {

      var img = document.createElement("img")
      img.setAttribute('src', window.localStorage.getItem("avatar"))
      img.setAttribute('width', '200px')
      img.setAttribute('height', '200px')
      img.setAttribute('id', 'avatar-img')
      img.style.borderStyle = "solid 2px"
      img.style.borderRadius = "20px"
      document.querySelector("legend#entry").append(img)
      document.querySelector("input#img-upload").style.visibility = "hidden"

          var b = document.createElement("button")
          var tn = document.createTextNode("reset")
          b.appendChild(tn)
          b.setAttribute("id", "reset-img")
          b.addEventListener("click", function () {
              const input = document.getElementById("img-upload")
              input.style.visibility = "visible"
              input.value = ""
              document.getElementById("avatar-img").remove()
              window.localStorage.removeItem("avatar")
              document.getElementById("reset-img").remove()

          })
      document.querySelector("legend#entry").append(b)
      
      


    }
  },[img])
  return (
  <form enctype="multipart/form-data" action="/upload" onSubmit={(e) => {
      e.preventDefault() 
  }}>
    <legend id="entry" style={{"borderRadius": "14px", "borderColor": "tomato"}} >{window.localStorage.getItem("username")}</legend>
    <input name="avatar" ref={img} type="file" id="img-upload" onChange={(e) => {
      const file = document.getElementById("img-upload").files[0]
      const data = new FormData()
      data.append('avatar', file, file.name.split('.')[0]+'-'+window.localStorage.getItem("username")+".png")
      window.localStorage.setItem("avatar", URL.createObjectURL(file))
      const opts = {
        "method":"POST",
        body: data 
      }
      fetch("https://kader.pub/upload", opts)
        .then ((response) => response.json())
        .then ((_data) => {
          if (_data.filename) {
            var img = document.createElement("img")
            img.setAttribute('src', window.localStorage.getItem("avatar"))
            img.setAttribute('id', 'avatar-img')
            img.style.width = "200px"
            img.style.height = "200px"
            img.style.borderStyle = "solid 2px"
            img.style.borderRadius = "20px"
          }

          // append success message
          var b = document.createElement("button")
          var tn = document.createTextNode("change")
          b.appendChild(tn)
          b.setAttribute("id", "reset-img")
          b.addEventListener("click", function () {
              const input = document.getElementById("img-upload")
              input.style.visibility = "visible"
              input.value = ""
              document.getElementById("avatar-img").remove()
              window.localStorage.removeItem("avatar")
              document.getElementById("reset-img").remove()
          })
          

          document.querySelector("legend#entry").append(img)
          document.querySelector("legend#entry").append(b)
          /* document.getElementById("img-upload").style.visibility = "hidden" */
          
        })
    }} />
  </form>
  )
}
export default Upload
