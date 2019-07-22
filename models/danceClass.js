const mongoose = require('./connection.js')


const DanceClassSchema = new mongoose.Schema({
 name: String,
 instructor: String,
 classSize: Number,
 studioId: String
})

const DanceClassCollection = mongoose.model('DanceClass', DanceClassSchema)



function getAllDanceClass() {
  return DanceClassCollection.find()
}

function getDanceClass(classId){
    return DanceClassCollection.findById(classId)
}

function getClassByStudioId(studioId){
    return DanceClassCollection.find(
        {"studioId" : studioId}
    )
}

function addNewDanceClass(danceClass){
    return DanceClassCollection.create(danceClass)
}

function updateDanceClass(classId, danceClass){
    return DanceClassCollection.findByIdAndUpdate(classId, danceClass, {new: true})

}

function deleteDanceClass(classId){
    return DanceClassCollection.findByIdAndDelete(classId)
}
module.exports = {
  getAllDanceClass,
  getDanceClass,
  getClassByStudioId,
  addNewDanceClass,
  updateDanceClass,
  deleteDanceClass
}
