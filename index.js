import express from 'express'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import socketIO from 'socket.io'
import jwt from 'jsonwebtoken'
import fs from 'fs'
const payload = {
  name: 'KatherineL',
  admin: true
}

/**
* RS 256
*/
const privateKey = fs.readFileSync('./config/private.key')
const token = jwt.sign(payload, privateKey, {algorithm: 'RS256'})
console.log(token)
const publicKey = fs.readFileSync('./config/public.key')
jwt.verify(token, publicKey, (error, decoded) => {
  if (error) {
    console.log(error)
    return
  } else {
    console.log(decoded)
  }
})


/**
* HS 256
*/
// const secret = 'KATHERINE_TEST_TOKEN'
// const token = jwt.sign(payload, secret)
// console.log(token)
//
// jwt.verify(token, secret, (error, decoded) => {
//   if (error) {
//     console.log(error)
//     return
//   } else {
//     console.log(decoded)
//   }
// })

const app = express()
const portNum = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

let comments = []
app.locals.comments = comments

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (request, response) => {
  response.render('index')
})
app.get('/comments', (request, response) => {
  response.render('comments/index')
})
app.get('/comments/new', (request, response) => {
  response.render('comments/new')
})

app.post('/comments/new', (request, response) => {
  if (!request.body.comment) {
    response.status(400).send('Do you have something to say ?')
    return
  }
  comments.push({
    comment: request.body.comment,
    created_at: new Date()
  })
  response.redirect('/comments')
})

let server = app.listen(portNum, () => {
  console.log(`Listen port: ${portNum}`)
})

let io = socketIO(server)

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('SUBMITFORM', (message) => {
    io.emit('FORM', message)
  })
});
