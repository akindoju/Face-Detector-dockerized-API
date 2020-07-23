const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require ('knex')

const Register = require('./Controllers/Register.js');
const SignIn = require('./Controllers/SignIn.js');
const Profile = require('./Controllers/Profile.js');
const Image = require('./Controllers/Image.js');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'Face-Detector'
    }
});


const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {res.send('Up and running')})
app.post('/SignIn', (req, res) => {SignIn.handleSignIn(req, res, db, bcrypt)})
app.post('/Register', (req, res) => {Register.handleRegister(req, res, db, bcrypt)})
app.get('/Profile/:id', (req, res) => {Profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {Image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res) => {Image.handleAPICall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})