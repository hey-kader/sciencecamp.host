import './css/App.css';
import Footer from './Footer.js'
import This from './This.js'
import That from './That.js'
import Home from './Home.js'
import Menu from './Menu'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import Reset from './Reset'
import Thanks from './Thanks'
import Dash from './Dash'
import Profile from './Profile'
import Feed from './Feed'
import Search from './Search'
import React, {useEffect, useState} from 'react'
import cookie from "react-cookie"
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'

import { useWeb3React } from "@web3-react/core"

import { injected } from "./components/wallet/Connector"

function App() {
	const { active, account, library, connector, activate, deactivate } = useWeb3React()
	const [toggle, setToggle] = useState(false);
	useEffect (() => {
		if (toggle) {
		}
		else {
			connect()
			setToggle(!toggle)
		}
		console.log(account)
	},[account, active, connect, connector]);

	async function connect () {
		try {
			await activate(injected)
		} 
		catch (ex) {
			console.log(ex)
		}
	}

	const [balance, setBalance] = useState(null);
	useEffect(() => {
		const Web3 = require ('web3')
		const web3 = new Web3(window.ethereum)
		if (account) {
		web3.eth.getBalance(account, (err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				console.log(web3.utils.fromWei(result, "ether"))
				if (balance === null) {
					setBalance(web3.utils.fromWei(result, "ether"))
				}
			}
		})
		}
	},[account]);
  const [post, setPost] = useState('')
  useEffect (() => {
    const opts = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({address: account})
    }
fetch('https://kader.pub/api', opts)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message)
        setPost(data.message)
      })
  },[active])


	async function disconnect () {
		try {
			deactivate()
		} 
		catch (ex) {
			console.log(ex)
		}
	}

	function swap () {
		// if browser is safari window.alert
		if (document.getElementById("connect").innerText === account) {
			setToggle(true)	
			disconnect()
		}
		else {
			setToggle(false)
			connect()
		}
	}

	useEffect (() => {
    if (window.localStorage.getItem("password") && (window.location.href == "https://kader.pub/" || window.location.href == "https://sciencecamp.host") ) {
			window.location.href = 'https://kader.pub/dash'
    }
		else {
		}
	},[])


  return (
    <div className="App">
      <div className="home"> 
        <div id="wallet">
          <button id="connect" onClick={swap} >{account ? account : "connect"}</button>
          <code id="balance">{active ? balance : ""}</code>
        </div>
        <BrowserRouter>
					<Link to="/">
						<h1 id="title">sciencecamp®</h1>
					</Link>

          <Link to="/menu">
						<h6> menu </h6>
					</Link>
					<br />
					<Link to="/login">
					<h6> login </h6>
					</Link>
					<br />
					<Link id="register" to="/register">
						<h6>register </h6>
					</Link>
					<div id="connection-status">
					</div>
          <Routes>
            <Route path="/" element={document.getElementById('logo')} />
            <Route path="/menu" element={<Menu/>} />
						<Route path="/menu/home" element={<Home />} />
						<Route path="/menu/this" element={<This />} />
						<Route path="/menu/that" element={<That />} />
						<Route path="login" element={<Login/>} />
						<Route path="logout" element={<Logout/>} />
						<Route path="/login/reset" element={<Reset />} />
						<Route path="register" element={<Register/>} />
						<Route path="/dash" element={<Dash />}/>
						<Route path="thanks" element={<Thanks />}/>
            <Route path="/feed" element={<Feed />} />
            <Route path="/search" element={<Search />} />
            <Route path="/dash/:id" element={<Profile />}/>

          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
