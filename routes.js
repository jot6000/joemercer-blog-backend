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
    
}

module.exports = {
    getProjectPreviews,
    getProjectPage,
    getPostPreviews,
    getPostPage,
    addProject,
}