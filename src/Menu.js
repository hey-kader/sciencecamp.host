import React from 'react'
import {useState, useEffect} from 'react'
import "./Menu.css"

import This from "./This.js"
import That from "./That.js"
import Home from "./Home.js"

import {Link} from 'react-router-dom'


function Menu () {

	const [flipflop, setFlipFlop] = useState('this.png');
	useEffect (() => {
		if (flipflop == 'this.png') {
			setFlipFlop('that.png')
		}
		else {
			setFlipFlop('this.png')
		}
	},[])

	return (
		<div id="nav">
			<h3>welcome</h3>
			<Link to="home" onMouseEnter={() => {document.getElementById('home').src = flipflop}}>
				<img className="header-logo" id="home" src="this.png" alt="header png logo" />
				<h5> home </h5>
			</Link>
			<Link to="this" onMouseEnter={() => {document.getElementById('this').src = flipflop}}>
				<img className="header-logo"  src="this.png" id="this" alt="header png logo" />
				<h5> this </h5>
			</Link>
			<Link to="that" onMouseEnter={() => {document.getElementById('that').src = flipflop}}>
				<img className="header-logo"  src="this.png" id="that" alt="header png logo" />
				<h5> that </h5>
			</Link>
		</div>
	)
}


export default Menu;
