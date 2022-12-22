import './App.css';
import Footer from './Footer.js'
import This from './This.js'
import That from './That.js'
import Home from './Home.js'
import Menu from './Menu'
import Login from './Login'
import React, {useEffect, useState} from 'react'
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
    fetch('http://192.168.1.28:3000/api', opts)
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

					<br />
					<br />

          <Link to="/menu">
            <img src="../favicon.ico"/> <code id="welcome"> welcome</code>
					</Link>
					<br />
					<Link to="/login">
					<code> <img src="../favicon.ico"/> login </code>
					</Link>
					<br />
					<div id="connection-status">
					</div>
          <Routes>
            <Route path="/" element={document.getElementById('logo')} />
            <Route path="/menu" element={<Menu/>} />
						<Route path="/menu/home" element={<Home />} />
						<Route path="/menu/this" element={<This />} />
						<Route path="/menu/that" element={<That />} />
						<Route path="login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
