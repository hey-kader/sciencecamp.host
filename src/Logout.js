import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom"

function Logout () {
  let navigation = useNavigate()
  useEffect(() => {
    const opts = {
      "method": "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: window.localStorage.getItem("username")
      })
    }
    fetch("https://sciencecamp.host/logout", opts)
      .then ((response) => response.json())
      .then((data) => {
        console.log(data)
      })
    window.sessionStorage.removeItem("username")
    window.localStorage.removeItem("password")
  },[])
  return;
}

export default Logout
