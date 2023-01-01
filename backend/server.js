require ("dotenv").config()
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

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


app.get('/', (req, res) => {
	res.send()
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

app.post('/login/auth', (req, res) => {
	
  mongoose.connect(process.env.uri)
	var db = mongoose.connection

db.collection("campers").findOne({username: req.body.username}, function (err, result) {
	if (err) {
		throw err
	}
	if (result) {
		console.log(result)
		console.log('password: ' + result.password)
		console.log('posted: ' + req.body.password)
	}
	else {
		console.log("user does not exist.")

	}
})
	//console.log(req.body)

/*  we should be querying a mongoose mongodb table here, to see 
*  if the credentials exist, and to respond to the fetch accordingly */
	if (req.body) {
		res.send (JSON.stringify(req.body))
	}

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
				})
			}

		})
	}
})

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/api', (req, res) => {
		res.send({
			address: req.body
		})
	console.log(req.body)

})

app.listen (port, ip,  () => {
	console.log('http://'+ip+':'+port)
})