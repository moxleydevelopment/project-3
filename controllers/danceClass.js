
const express = require('express')


const DanceClassApi = require('../models/danceClass.js')


const DanceClassRouter = express.Router()


DanceClassRouter.get('/', (req, res) => {
    DanceClassApi.getAllDanceClass()
    .then((classes)=>{
        res.json(classes)
    })
  
})

DanceClassRouter.get('/:classId', (req, res)=>{
    DanceClassApi.getDanceClass(req.params.classId)
    .then((danceClass)=>{
        res.json(danceClass)
    })
})

DanceClassRouter.post('/', (req, res)=>{
    DanceClassApi.addNewDanceClass(req.body)
    .then((danceClass) =>{
        res.json(danceClass)
    })
})

DanceClassRouter.put('/:classId', (req, res)=>{
    DanceClassApi.updateDanceClass(req.params.classId, req.body)
    .then((danceClass)=>{
        res.json(danceClass)
    })
})


module.exports = {
  DanceClassRouter
}
