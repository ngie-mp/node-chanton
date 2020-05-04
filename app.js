//Before Auth TODO: To refactor  
const express = require('express') ;
const app = require('express')() ;
const http = require('http')
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server) ;
const path = require('path') ;
const bodyParser = require('body-parser')
const cors = require('cors')

var corsOptions = {
  origin: 'http://0.0.0.0:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
	console.log(__dirname);
	res.sendFile(__dirname + '/index.html');	
});

app.route('/api/words').get((req, res) => {
	res.send([
		{ name: 'martillo',
			category: 'cosa',
			letra: 'M'
		}, 
		{ name: 'baston',
			category: 'Object',
			letra: 'B'
		}
	])
});

app.route('/api/words/:name').get((req, res) => {
	const requestedWordName = req.params['name']
	res.send({ name: requestedWordName })
});	

app.route('/api/words').post((req, res) => {
	res.send(201, req.body)
	console.log('Posted data', req.body, req)
});

app.route('/api/words/:names').put((req, res) => {
	res.send(201, req.body)
});

app.route('/api/words/:name').delete((req, res) => {
	res.sendStatus(204)
});

app.route('/api/categories/').get((req, res) => {
	res.send([
		{
			name: 'Food'
		},
		{
			name: 'City'
		},
		{
			name: 'Name'
		},
		{
			name: 'Object'
		}
	])
});

// Add the WebSocket handlers
io.on('connection', function(socket) {
	console.log('socket', socket);
});

app.listen(3000,function(){
	console.log("Listening to connections on *:3000") ;
})
