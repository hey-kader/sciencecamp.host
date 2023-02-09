import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom"

function Logout () {
  let navigation = useNavigate()
  useEffect(()=>{
    window.sessionStorage.removeItem("username")
    window.localStorage.removeItem("password")
    navigation('/login')
  },[])
  return;
}

export default Logout
