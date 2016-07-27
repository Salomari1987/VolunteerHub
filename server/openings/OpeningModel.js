var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var openingSchema = new mongoose.Schema({
  title : {
  	type : String,
  	required : true
  },
  _owner : { 
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Opportunity',
    required: true
  },
  numberOfVolunteers: Number,
  location : String,
  description : String,
  skillsrequired : [String],
  resources: [String],
  volunteers : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
var Opening = mongoose.model( 'Opening', openingSchema );

module.exports = Opening;