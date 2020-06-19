const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

const db = require('./database/db')


server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))

server.get('/', (req, res) => {
    db.all(`SELECT * FROM items`, (err, rows) => {
        if (err) {
            return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
        }
        console.log(rows)
        return res.render('index.html', { rows })
    })
})
server.get('/list', (req, res) => {
    db.all(`SELECT * FROM items`, (err, rows) => {
        if (err) {
            return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
        }
        res.json(rows)
    })
})


server.use(function(req, res, next) {
    const date = new Date
    res.status(404);

    console.log(`App Error In ${req.protocol}://${req.hostname}${req.originalUrl}\nDate: ${date.toDateString()} 
  ${date.toTimeString()}`)

    // respond with html page
    if (req.accepts('html')) {
        res.render('404.html', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found', url: req.url });
        return;
    }

    res.type('txt').send(`Not found ${req.url}`);
});
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})


server.listen(process.env.PORT || 3000)
console.log(`Server in http://localhost:${process.env.PORT || 3000}`)