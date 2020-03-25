const express = require('express')
const http = require('http')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const connectDb = require('./db')

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded());
router(app)
const port = process.env.PORT || 4000

connectDb()
const server = http.createServer(app);
server.listen(port, console.log(`server listinning port: ${port}`))