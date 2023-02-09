import React, {useEffect} from 'react'

function Logout () {
  useEffect(()=>{
    window.sessionStorage.removeItem("username")
    window.localStorage.removeItem("password")
    window.location.href = "https://sciencecamp.host/thanks"
  },[])
  return;
}

export default Logout
