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

    //Just evaluate this as true for testing purposes and switch it back when publishing
    //process.env.PASSPHRASE == request.body.passphrase
    if(process.env.PASSPHRASE == request.body.passphrase){
        const title = request.body.title
        const preview = request.body.preview
        const urlpostfix = request.body.urlpostfix
        const content = request.body.content

        pool.connection.query('INSERT INTO projects (title,preview,urlpostfix,content) VALUES ($1,$2,$3,$4)', [title, preview, urlpostfix, content], (error, results) => {
            if (error) {
                response.status(500).json(error)
            }
            response.status(200).json({ succsess: 'We did it' })
        })
    }
    else{
        response.status(500).json({error:'passphrase incorrect or not provided'})
    }
}

const addPost = (request, response) => {

    //Just evaluate this as true for testing purposes and switch it back when publishing
    //process.env.PASSPHRASE == request.body.passphrase
    if(process.env.PASSPHRASE == request.body.passphrase){
        const title = request.body.title
        const preview = request.body.preview
        const urlpostfix = request.body.urlpostfix
        const content = request.body.content
        const date = request.body.date

        pool.connection.query('INSERT INTO posts (title,preview,urlpostfix,content,date) VALUES ($1,$2,$3,$4,$5)', [title,preview,urlpostfix,content,date], (error, results) => {
            if (error) {
                response.status(500).json(error)
            }
            response.status(200).json({ succsess: 'We did it' })
        })
    }
    else{
        response.status(500).json({error:'passphrase incorrect or not provided'})
    }
}

const editPost = (request, response) => {

    //Just evaluate this as true for testing purposes and switch it back when publishing
    //process.env.PASSPHRASE == request.body.passphrase
    if(process.env.PASSPHRASE == request.body.passphrase){
        const title = request.body.title
        const preview = request.body.preview
        const urlpostfix = request.body.urlpostfix
        const content = request.body.content
        const date = request.body.date
        const oldpostfix = request.body.oldpostfix
        
        //UPDATE posts SET title='$1',preview='$2',urlpostfix='$3',content='$4',date='Sunday, March 09, 2008 4:05:07 PM' WHERE urlpostfix = 'SafeNPM';

        pool.connection.query("UPDATE posts SET title='"+title+"',preview='"+preview+"',urlpostfix='"+urlpostfix+"',content='"+content+"',date='"+date+"' WHERE urlpostfix = '"+oldpostfix+"'", (error, results) => {
            if (error) {
                response.status(500).json(error)
            }
            response.status(200).json({ succsess: 'We did it' })
        })
    }
    else{
        response.status(500).json({error:'passphrase incorrect or not provided'})
    }
}

const editProject = (request, response) => {

    //Just evaluate this as true for testing purposes and switch it back when publishing
    //process.env.PASSPHRASE == request.body.passphrase
    if(process.env.PASSPHRASE == request.body.passphrase){
        const title = request.body.title
        const preview = request.body.preview
        const urlpostfix = request.body.urlpostfix
        const content = request.body.content
        const oldpostfix = request.body.oldpostfix
        
        //UPDATE posts SET title='$1',preview='$2',urlpostfix='$3',content='$4',date='Sunday, March 09, 2008 4:05:07 PM' WHERE urlpostfix = 'SafeNPM';

        pool.connection.query("UPDATE projects SET title='"+title+"',preview='"+preview+"',urlpostfix='"+urlpostfix+"',content='"+content+"'"+"' WHERE urlpostfix = '"+oldpostfix+"'", (error, results) => {
            if (error) {
                response.status(500).json(error)
            }
            response.status(200).json({ succsess: 'We did it' })
        })
    }
    else{
        response.status(500).json({error:'passphrase incorrect or not provided'})
    }
}

module.exports = {
    getProjectPreviews,
    getProjectPage,
    getPostPreviews,
    getPostPage,
    addProject,
    addPost,
    editPost,
    editProject
}