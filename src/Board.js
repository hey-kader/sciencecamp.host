import React, {useState} from "react"

function Board (props) {

  const [username, setUsername] = useState(props.username)
  const [title, setTitle] = useState(props.title)
  const [text, setText] = useState(props.text)

  return (
    <div id="board">
      <h2 id="username">{username}</h2>
      <h3 id="title">{title}</h2>
      <p id="text">{text}</p>
    </div>
  )
}

export default Board
