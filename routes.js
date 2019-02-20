const pool = require('./pool')

const getProjectPreviews = (request, response) => {
    pool.connection.query('SELECT title,preview,urlpostfix FROM projects ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProjectPage = (request, response) => {

    const urlpostfix = request.params.urlpostfix

    console.log(urlpostfix)

    pool.connection.query('SELECT content FROM projects WHERE urlpostfix = $1 ORDER BY id ASC', [urlpostfix], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

const getPostPreviews = (request, response) => {
    pool.connection.query('SELECT title,preview,urlpostfix,date FROM posts ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPostPage = (request, response) => {

    const urlpostfix = request.params.urlpostfix

    console.log(urlpostfix)

    pool.connection.query('SELECT content FROM posts WHERE urlpostfix = $1 ORDER BY id ASC', [urlpostfix], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

const addProject = (request, response) => {

    const title = request.params.title
    const preview = request.params.preview
    const urlpostfix = request.params.urlpostfix
    const content = request.params.content

    pool.connection.query('INSERT INTO projects (title,preview,urlpostfix,content) VALUES ($1,$2,$3,$4)', [title,preview,urlpostfix,content], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200)
    })
}

const addPost = (request, response) => {

    const title = request.params.title
    const preview = request.params.preview
    const urlpostfix = request.params.urlpostfix
    const content = request.params.content
    const date = request.params.date

    let body = [];
    request.on('data', (chunk) => {
    body.push(chunk);
    }).on('end', () => {
    body = Buffer.concat(body).toString();
    // at this point, `body` has the entire request body stored in it as a string
    console.log('Request add post:')
    console.log(body)
    });

    pool.connection.query('INSERT INTO posts (title,preview,urlpostfix,content,date) VALUES ($1,$2,$3,$4,$5)', [title,preview,urlpostfix,content,date], (error, results) => {
        if (error) {
            throw error
        }
        response.json({title:'We did it',body:body})
    })
}

module.exports = {
    getProjectPreviews,
    getProjectPage,
    getPostPreviews,
    getPostPage,
    addProject,
    addPost
}