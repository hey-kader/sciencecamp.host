import {Component} from "react"
import './css/Profile.css'

function makepost (title, text, created, color) {

  var root = document.createElement("div")
  var end = document.createElement("h4")
  end.setAttribute('id', 'post-heading')
  var entText = document.createTextNode(title)
  var content = document.createElement("p")
  var _text = document.createTextNode(text)
  var createdAt = document.createElement("h7")
  // have to truncate this number
  function relativeDate (datestr) {
    var epochdiff = Date.now() - Date.parse(datestr)
    epochdiff = epochdiff/60/60/60
    return Math.trunc(epochdiff) + "m ago"
  }
  var createdAtTextNode = document.createTextNode(relativeDate(created))

  createdAt.appendChild(createdAtTextNode)
  createdAt.setAttribute('id', 'timestamp')
  content.appendChild(_text)
  end.appendChild(entText)

  root.append(createdAt)
  root.append(end)
  root.append(content)
  root.style.backgroundColor = color
  root.setAttribute('id', 'post')
  document.getElementById("entry").append(root)
  
}

class Profile extends Component { 


   state = {data: new Array()}

  componentDidMount () {
    const opts = {
      "method": "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }

  var name = window.location.pathname
  name = name.split('/')[name.split('/').length -1]

  fetch("https://sciencecamp.host/api/"+name, opts)
    .then ((response) => response.json())
    .then ((data) => {
      data.data.forEach((item) => {
        console.log(item)
        this.state.data.push(item)
      })
      console.log(this.state.data.length)
      //new
      document.getElementById("username").innerHTML = name 
      if (this.state.data.length === 0) {
        document.getElementById("entry").innerHTML = "no posts"
      }

      for (var i = 0; i < this.state.data.length; i++) {
        var item = this.state.data[this.state.data.length - 1 - i]
        console.log(item.title)
        makepost(item.title, item.text, item.created, item.color)
      }
    })
    console.log(this.state.data)
  }

  render () {
    return (
      <>
      <button onClick={() => window.location.href = "https://sciencecamp.host/dash"}>back</button>
      <h2 id="postcount"></h2>
      <h1 id="username"></h1>
      <div id="entry"></div>
      </>
    ) 
  }

}
export default Profile
