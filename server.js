// Express
    const express = require('express')
    const app = express()
    const PORT = process.env.PORT || 3001
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

// Mongoose
    const mongoose = require('mongoose')

    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // Use this to log mongo queries being executed!
    mongoose.set('debug', true);

    // Files
    app.use(require('./routes'));

    // Server Listen
    app.listen(PORT, () => {
        console.log((`Connected on localhost:${PORT}`))
    })