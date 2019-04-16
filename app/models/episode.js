const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  url: {
    type: String
  }
},
{
  timestamps: true
})

const episodeSchema = new mongoose.Schema({

  urls: [
    imageSchema
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Episode', episodeSchema)

// Example of subSchema from https://stackoverflow.com/questions/15047520/arrays-of-schema-types-on-mongoose
// var links = new Schema({
//   link: URL
// });
//
// var s = new Schema({
//   links: {
//    type: [links]
//   }
// });
