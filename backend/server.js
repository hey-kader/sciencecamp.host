require ("dotenv").config()
const  path = require ( "path" )

const IP = process.env.ip
const PORT = process.env.port

const express = require ("express")
const bodyparser = require ( "body-parser" )

var app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
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
	
	console.log(req.body)
	/*  we should be querying a mongoose mongodb table here, to see if the credentials exist, and to respond to the fetch accordingly */
	if (req.body) {
		res.send (JSON.stringify(req.body))
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

app.listen(PORT, IP, () => {
  console.log('http://'+IP+':'+PORT)
})
