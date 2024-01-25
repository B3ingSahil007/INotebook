const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

/*
* app.get('/', (req, res) =>
*     res.send('Hello Sahil Miyawala.')
* )
* app.get('/api/v1/login', (req, res) => {
*     res.send('Sahil Miyawala has Log-In.');
* })
* 
* app.get('/api/v1/signup', (req, res) => {
*     res.send('Sahil Miyawala has Sign-Up.');
* })
*/

app.use(cors())
app.use(express.json());

//^ Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`INotebook Backend listening on port http://localhost:${port}`);
})