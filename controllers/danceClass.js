
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
    console.log(req.params.classId)
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


module.exports = {
  DanceClassRouter
}
