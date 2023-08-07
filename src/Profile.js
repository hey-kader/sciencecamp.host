import React from "react"
import {Link} from "react-router-dom"
import './css/Profile.css'

function makepost (post) {

  var root = document.createElement("div")
  var end = document.createElement("h4")
  end.setAttribute('id', 'post-heading')
  var entText = document.createTextNode(post.title)
  var content = document.createElement("p")
  var _text = document.createTextNode(post.text)
  /*var createdAt = document.createElement("h7")*/
  // have to truncate this number

  /*
  function relativeDate (datestr) {
    var epochdiff = Date.now() - Date.parse(datestr)
    epochdiff = epochdiff/60/60/60
    return Math.trunc(epochdiff) + "m ago"
  }


  var createdAtTextNode = document.createTextNode(relativeDate(created))

  createdAt.appendChild(createdAtTextNode)
  createdAt.setAttribute('id', 'timestamp')
  */
  content.appendChild(_text)
  end.appendChild(entText)

  /* root.append(createdAt) */
  root.append(end)
  root.append(content)
  root.style.backgroundColor = post.color
  root.setAttribute('id', 'post')
  document.getElementById("entry").appendChild(root)
  
}

class Profile extends React.Component { 

  state = {
    posts: null,
    name: null,
    avatar: null
  }

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      name: "",
      avatar: ""

    }
  }
  componentWillMount () {

    // grab the users name from the windows url
    var name = window.location.href
    name = name.split('/')[name.split('/').length-1]
    const opts = {
      "method": "get",
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    fetch("https://kader.pub/api/"+name, opts)
    .then ((response) => response.json())
    .then ((dat) => {

      /*
      for (var i = 0; i < dat.url.posts.length; i++) {
        this.state.posts.push(dat.url.posts[i])
      }
      */
      this.setState({posts: dat.url.posts})
      this.setState({name: dat.url.username})
      this.setState({avatar: dat.url.profilepic})

    })
  }




  render () {
    document.querySelectorAll("h6").forEach((element) => {
      element.remove()
    })
    this.state.posts.forEach((post) => {
      makepost(post)
    })


    return (
      <>
      <Link to="/search">back</Link>
      <h2 id="postcount"></h2>
      <h1 id="username">{this.state.name}</h1>
      <div id="avatar">
        <img src={this.state.avatar} />
      </div>
      <div id="entry"></div>
      </>
    ) 
  }

}
export default Profile
