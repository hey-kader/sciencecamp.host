import {Component} from "react"

function makepost (title, text, created) {
  var root = document.createElement("div")
  var end = document.createElement("h1")
  var entText = document.createTextNode(title)
  var content = document.createElement("p")
  var _text = document.createTextNode(text)
  content.appendChild(_text)
  end.appendChild(entText)
  root.append(end)
  root.append(content)
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
    fetch(window.location.href, opts)
    .then ((response) => response.json())
    .then ((data) => {
      data.data.forEach((item) => {
        console.log(item)
        this.state.data.push(item)
      })
      console.log(this.state.data)
      this.state.data.forEach((item) => {
        console.log(item.title)
        makepost(item.title, item.text, item.created)
      })
    })
    console.log(this.state.data)
  }

  render () {
    return (
      <>
      <h2 id="postcount"></h2>
      <p id="entry">hi</p>
      </>
    ) 
  }

}
export default Profile
