
const mongoose = require('./connection.js')




const DanceStudioSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNumber: Number,
  danceClass: Object,
  hoursOfOperation: String,
  description: String 



})


const DanceStudioCollection = mongoose.model('DanceStudio', DanceStudioSchema)


function getDanceStudios() {
  return DanceStudioCollection.find()
}

function getDanceStudio(dsId){
    return DanceStudioCollection.findById(dsId)
}

function createDanceStudio(danceStudio){
    return DanceStudioCollection.create(danceStudio)
}

function updateDanceStudio(dsId, danceStudio){
    return DanceStudioCollection.findByIdAndUpdate(dsId, danceStudio)
}


module.exports = {
  getDanceStudios,
  getDanceStudio,
  
}
