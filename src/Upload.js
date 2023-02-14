import React, {useRef, useEffect} from "react"
function Upload () {
  const img = useRef()
  useEffect(() => {
    if (window.localStorage.getItem("avatar")) {
      document.getElementById("img-upload").remove()

      var img = document.createElement("img")
      img.setAttribute('src', window.localStorage.getItem("avatar"))
      img.setAttribute('width', '180px')
      img.setAttribute('height', '180px')
      img.style.borderStyle = "solid 1px"
      img.style.borderRadius = "12px"
      document.querySelector("legend#entry").append(img)

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
      data.append('avatar', file, file.name.split('.')[0]+'-'+window.localStorage.getItem("username")+".png")
      window.localStorage.setItem("avatar", URL.createObjectURL(file))
      const opts = {
        "method":"POST",
        body: data 
      }
      fetch("https://sciencecamp.host/upload", opts)
        .then ((response) => response.json())
        .then ((_data) => {
          console.log(_data.filename)
          if (_data.filename) {
            window.localStorage.setItem('profile-pic-url', 'https://sciencecamp.host/uploads/'+_data.filename)
            var img = document.createElement("img")
            img.setAttribute('src', window.localStorage.getItem("avatar"))
            img.setAttribute('width', "190px")
            img.setAttribute('height', "190px")

            img.style.borderStyle = "solid 1px"
            img.style.borderRadius = "12px"
          }

          // append success message
          var h = document.createElement("h6")
          var tn = document.createTextNode(_data.filename)
          h.appendChild(tn)
          document.querySelector("legend#entry").append(img)
          document.getElementById("img-upload").remove()
        })
    }} />
  </form>
  )
}
export default Upload
