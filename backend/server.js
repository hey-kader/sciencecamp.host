require ("dotenv").config()
const bcrypt = require ("bcrypt")
const mongoose = require ("mongoose")
const db = require ("./model/db")
const Camper = require ('./model/camper')
const Post = require ('./model/post')
const Online = require ('./model/online')
var fs = require ("fs")
var morgan = require ("morgan")
const https = require ("https")

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
const accessLog = fs.createWriteStream(path.join(__dirname, 'logs/'+Date()), {flags: 'a'})
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
	secret: process.env.secret,
	cookie: {
		httpOnly: false,
		domain: "sciencecamp.host",
		secure: true,
		samesite: true
	},
	store: MongoStore.create({
		client: mongoose.connection.getClient(),
		dbName: 'sciencecamp',
		collectionName: 'sessions',
		stringify: false

	}),
}))

const credentials = {
	cert: fs.readFileSync("./.ssl/cert.pem"),
	key: fs.readFileSync("./.ssl/key.pem")
}

const server = https.createServer(credentials, app).listen(443, ip)

app.get ('/img', (req, res) => {
	res.sendFile(path.join(__dirname,'clouds.png'))
})


app.get('/', (req, res) => {

	console.log('test')
	console.warn('test')
	
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
	db.collection("campers").updateOne({username: req.body.username}, { $set: {"latest": new Date()}}, {"visits": {$inc: 1}}, function (err, result) {

		if (err) {
			throw err
		}

		if (result) {

			db.collection("campers").findOne({username: req.body.username}, function (err, _result) {
				if (err) {
					throw err;
				}
			else if (_result){
				console.log(_result)
				//
				console.log(_result.username+':\t(visits: '+_result.visits+')')
			}
			else {
				console.log ('does not exist')
			}
			console.log(req.body.username+':\t(login attempt)')
			req.session.password = req.body.password
			req.session.username = req.body.username 
			db.collection("campers").updateOne({username: req.body.username}, {$inc: {visits: 1}})

			req.session.save ((err) => console.log(err))

			res.send({username: req.body.username, password: req.body.password})
			})

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
	console.log(req.cookies)
	let names = new Array()
	Camper.find({})
		.then((data)=> {
			const opts = {
				"Content-Type": "application/json"
			}

			res.status(200).send({"users": data})
			})

})


app.get ('/campers', (req, res) => {
	const users = []
	
	Camper.find({}).then((data)=> res.status(200).send(data))
})

app.post ('/campers', (req, res) => {
	Camper.find({}).then((data)=> res.send(data))
})


app.get('/thanks', (req, res) => {
	res.redirect('/')
})

app.post ('/register/auth', (req, res) => {
	if (req.body) {

		console.log(req.body)
		mongoose.connect(process.env.uri)	
		var db = mongoose.connection

		console.log(req.cookies)
		const camper = new Camper ({
			id: uuidv4(),
			username: req.body.username, 
			password: req.body.password, 
			created: req.body.created,
			visits: 1
		})

		var exists = null 
		db.collection("campers").findOne({username: req.body.username}, function (err, result) {

			if (err) {
				throw err;
			}

			if (result) {
				console.log("user exists!")
				console.log(result)
				res.send(JSON.stringify({exists: true}))
			}

			else {
				// new user inherits the uuid: _id of that session
				console.log("new user.")
					camper.save (function (err, camper) {
					if (err) {
						console.log("err")
						console.log(err)
					}
					else {
						console.log('saved')
						console.log(camper)
						console.log('created:\t'+req.body.username+' has been created')
						console.log('session:\t'+req.session)
						console.log('saved')
						res.send({msg: req.body.username+' has been created'})
					}
				})
			}

		})
	}
})

/* 
let result = db.collection("campers").findOne({username: req.body.username})
if (result) {
	req.session.password = req.body.password
}
else {
	
}

*/
app.post('/login/reset',(req, res) => {
	console.log ('posted to /login/reset!')	
	console.log(res.body)
	res.send({msg: 'successfully reset (test)'})
})

app.post('/api', (req, res) => {
	req.session.ip = req.ip
	console.log(req.session.cookie)
	res.status(200).send({address: req.ip})
})

/*
app.listen (port, ip,  () => {
	console.log('http://'+ip+':'+port)
})
*/


app.post('/dash/post', (req, res) => {
  // title, username, and text are attached to req.body
  console.log('post!!')
  console.log(req.body)
  const post = new Post({
    username: req.body.username,
    title: req.body.title,
    text: req.body.text
  })
  post.save(function (err, post) {
    console.log('post saved in db.')
    res.status(200).send({msg: 'posted ok.'})

  }) 
})


app.get('/posts', (req, res) => {
  Post.find({})
  .then((data) => {
    const opts = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    res.status(200).send({posts: data})
  })
})

app.post('/online', (req, res) => {

  // add req.body.username to online list
  if (req.body.username) {
    const online = new Online({username: req.body.username})
    online.save(() => {
      console.log('saved online user: '+req.body.username)
    })
    Online.find({})
    .then((data) => {
      res.status(200).send({users: data})
    })
  }
})

app.post('/offline', (req, res) => {
  // remove req.body.username from online list
  if (req.body.username) {
    Online.find({username: req.body.username})
      .then((data) => {
        if (data) {
          Online.deleteOne({username: req.body.username})
          .then((data) => console.log(data))
        }  
      })

  }
})


