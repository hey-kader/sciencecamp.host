require ("dotenv").config()
const bcrypt = require ("bcrypt")
const mongoose = require ("mongoose")
const db = require ("./model/db")
const Camper = require ('./model/camper')
var fs = require ("fs")
var morgan = require ("morgan")

mongoose.set({strictQuery: false})

const path = require ("path")

const ip = process.env.ip
const port = process.env.port

const express = require ("express")
const bodyparser = require ( "body-parser" )

const session = require ("express-session")
const MongoStore = require ("connect-mongo")
const {v4: uuidv4} = require ("uuid")

var app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


// save logs
const accessLog = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLog}))


const cookieParser = require ("cookie-parser")
app.use(cookieParser())

// req.session, req.session.cookie, req.session.store objects
app.use(session({
	genid: (req) => {
		return uuidv4()
	},
	resave: true,
	saveUninitialized: true,
	secret: "secret",
	cookie: {
		httpOnly: true,
		domain: "172.20.20.20",
		path: '/',
		secure: false
	},
	store: MongoStore.create({
		client: mongoose.connection.getClient(),
		dbName: 'sciencecamp',
		collectionName: 'sessions',
		stringify: false
	}),
	views: 0,
}))

app.get('/', (req, res) => {

	if (req.session.views) {
		req.session.views++
	}
	else {
		req.session.views = 0
	}
	console.log(req.session)
	res.sendFile(path.join('public', 'index.html'))
})

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/menu', (req, res) => {
	req.session.cookie.path = "/menu"
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/menu/home', (req, res) => {
	req.session.cookie.path = "/menu/home"
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/menu/this', (req, res) => {
	req.session.cookie.path = "/menu/this"
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/menu/that', (req, res) => {
	req.session.cookie.path = "/menu/that"
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/login', (req, res) => {
	req.session.cookie.path = "/login"
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get ('/login/reset', (req, res) => {
	req.session.cookie.path = "/login/reset"
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/register', (req, res) => {
	req.session.cookie.path = "/register"
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get ('/dash', (req, res) => {
	// only redirect to /login if there is no localstorage.getItem("password") on the client's side
	req.session.cookie.path = "/dash"

  res.sendFile(path.join(__dirname, 'build', 'index.html'))
//res.redirect('/login')
	
})

app.post('/login/auth', (req, res) => {
	
  mongoose.connect(process.env.uri)
	var db = mongoose.connection

	db.collection("campers").findOneAndUpdate({username: req.body.username}, { $set: {"latest": new Date()}}, {$set: {"visits": visits+1}}, function (err, result) {

		if (err) {
			throw err
		}

		if (result) {

			console.log(result)
			console.log(result.username+':\t(login attempt)')

			
			console.log(result._id)
			req.session.cookie.username = result.username
			req.session.cookie.password = result.password

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




app.post ('/dash', (req, res) => {
	let names = new Array()
	Camper.find({})
		.then((data)=> {
			const opts = {
				"Content-Type": "application/json"
			}

			res.status(200).send({users: data})
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
			latest: req.body.latest,
			visits: 0
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
					camper.id = req.session._id
					res.send({msg: camper._id+' has been created'})
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

app.post('/api', (req, res) => {
	res.status(200).send({address: req.ip})
})

app.listen (port, ip,  () => {
	console.log('http://'+ip+':'+port)
})
