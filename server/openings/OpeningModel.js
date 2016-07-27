var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var openingSchema = new mongoose.Schema({
  title : {
  	type : String,
  	required : true
  },
  _opportunity: { 
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Opportunity',
    required: true
  },
  numberOfVolunteers: Number,
  location : String,
  description : String,
  skillsrequired : [String],
  resources: [String],
  pendingApps: [{ type:mongoose.Schema.Types.ObjectId, ref:'User' }],
  volunteers : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: {
    type: String,
    enum: ['Active', 'Closed']
  }
});
var Opening = mongoose.model( 'Opening', openingSchema );

module.exports = Opening;