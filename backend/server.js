require ("dotenv").config()
const bcrypt = require ("bcrypt")
const mongoose = require ("mongoose")
const db = require ("./model/db")
const Camper = require ('./model/camper')

mongoose.set({strictQuery: true})

const  path = require ( "path" )

const ip = process.env.ip
const port = process.env.port

const express = require ("express")
const bodyparser = require ( "body-parser" )

var app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

const cookieparser = require ("cookie-parser")
//app.use(cookieparser)


app.get('/', (req, res) => {
  res.sendFile(path.join('public', 'index.html'))
})

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/menu/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/menu/this', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/menu/that', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get ('/login/reset', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/login/auth', (req, res) => {
	
  mongoose.connect(process.env.uri)
	var db = mongoose.connection

	db.collection("campers").findOne({username: req.body.username}, function (err, result) {

		if (err) {
			throw err
		}

		if (result) {

			console.log(result.username+':\t(login attempt)')

			// seperate the salt from the digest, and rehash the password
			
			//bcrypt.compare(result.password, req.body.password).then(e => console.log(result.username + ':\t' + e))
			res.send({name: result.username, passhash: result.password})

		}
		else {
			console.log("user does not exist.")
			res.send({errmesg: "user does not exist"})
		}

	})
	//console.log(req.body)

/*  we should be querying a mongoose mongodb table here, to see 
*  if the credentials exist, and to respond to the fetch accordingly */

/*
	if (req.body) {
		 res.send (JSON.stringify(req.body))  
	}
*/
})

app.get ('/dash', (req, res) => {
	// only redirect to /login if there is no localstorage.getItem("password") on the client's side
	res.redirect('/login')
	
})

app.post ('/dash', (req, res) => {
	const names = [] 
	Camper.find({}).then((data)=> {
		data.forEach((item) => {
			names.push(item.username)
		})
		res.status(200).send(names)
		
	})
})

/*
app.get ('/campers', (req, res) => {
	const users = []
	
	Camper.find({}).then((data)=> res.status(200).send(data))
})

app.post ('/campers', (req, res) => {
	Camper.find({}).then((data)=> res.send(data))
})
*/

app.get('/thanks', (req, res) => {
	res.redirect('/')
})

app.post ('/register/auth', (req, res) => {
	if (req.body) {

		console.log(req.body)
		mongoose.connect(process.env.uri)	
		var db = mongoose.connection

		const camper = new Camper ({
			username: req.body.username, 
			password: req.body.password, 
			created: req.body.created,
			latest: req.body.latest
		})

		var exists = null 
		db.collection("campers").findOne({username: camper.username}, function (err, result) {

			if (err) {
				throw err;
			}

			if (result) {
				console.log("user exists!")
				res.send(JSON.stringify({exists: true}))
			}

			else {
				console.log("new user.")
				camper.save (function (err, camper) {
					console.log(camper.username+' has been created')
					res.send({msg: camper.username+' has been created'})
				})
			}

		})
	}
})

app.post('/login/reset',(req, res) => {
	console.log ('posted to /login/reset!')	
	console.log(res.body)
	res.send({msg: 'successfully reset (test)'})
})

app.listen (port, ip,  () => {
	console.log('http://'+ip+':'+port)
})
