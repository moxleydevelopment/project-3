
const express = require('express')
const app = express()


const { DanceStudioRouter } = require('./controllers/danceStudio.js')
const {DanceClassRouter} = require('./controllers/danceClass')



app.use(express.urlencoded({extended: true}))


app.use(express.json())



app.use(express.static(`${__dirname}/client/build`))



app.use('/api/dancestudio', DanceStudioRouter)
app.use('/api/dancestudio/:studioId/danceclass', DanceClassRouter)

/* Step 5
 *
 * add catch all route to serve up the built react app for any request not made to our
 * /api/... routes.
 */
app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

/* Step 6
 *
 * Set the port the server is to run on
 *
 * NOTE: keep these lines at the bottom of the file 
 */
const PORT = process.env.PORT || 3001

/* Step 7
 *
 * Start the server
 */
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
