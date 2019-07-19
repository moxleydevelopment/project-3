
const express = require('express')

const DanceStudioApi = require('../models/danceStudio.js')


const DanceStudioRouter = express.Router()


DanceStudioRouter.get('/', (req, res) => {
   DanceStudioApi.getDanceStudios()
   .then((studios)=>{
       res.json(studios)
   })
})




module.exports = {
  DanceStudioRouter
}
