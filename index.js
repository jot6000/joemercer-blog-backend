const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./routes')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Joemercer Blog Server is online' })
})
app.get('/projectPreviews', db.getProjectPreviews)
app.get('/projectPage/:urlpostfix', db.getProjectPage)
app.get('/postPreviews', db.getPostPreviews)
app.get('/postPage/:urlpostfix', db.getPostPage)
app.post('/addPost', db.getPostPage)
app.post('/addProject', db.getPostPage)

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port)