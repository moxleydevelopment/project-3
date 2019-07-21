
const express = require('express')

const DanceStudioApi = require('../models/danceStudio.js')


const DanceStudioRouter = express.Router()

DanceStudioRouter.get('/', (req, res) => {
  DanceStudioApi.getDanceStudios()
    .then((studios) => {
      res.json(studios)
    })
})

DanceStudioRouter.get('/:danceStudioId', (req, res) => {
  DanceStudioApi.getDanceStudio(req.params.danceStudioId)
    .then((danceStudio) => {
      res.json(danceStudio)
    })
})




DanceStudioRouter.post('/', (req, res)=>{
  DanceStudioApi.addDanceStudio(req.body)
  .then((newStudio)=>{
    res.json(newStudio)
  })
})

DanceStudioRouter.put('/:danceStudioId', (req, res)=>{
  DanceStudioApi.updateDanceStudio(req.params.danceStudioId, req.body)
  .then((danceStudio)=>{
    res.json(danceStudio)
  })
})

DanceStudioRouter.delete('/:danceStudioId', (req, res)=>{
  DanceStudioApi.deleteDanceStudio(req.params.danceStudioId)
  .then((danceStudio)=>{
    res.json(danceStudio)
  })
})






module.exports = {
  DanceStudioRouter
}
