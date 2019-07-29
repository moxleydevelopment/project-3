
const express = require('express')
const app = express()


const { DanceStudioRouter } = require('./controllers/danceStudio.js')
const {DanceClassRouter} = require('./controllers/danceClass')



app.use(express.urlencoded({extended: true}))


app.use(express.json())



app.use(express.static(`${__dirname}/client/build`))



app.use('/api/dancestudio', DanceStudioRouter)
app.use('/api/dancestudio/:studioId/danceclass', DanceClassRouter)


app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})


const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
