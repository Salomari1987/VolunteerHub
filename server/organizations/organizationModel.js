var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrganizationSchema = new mongoose.Schema({
	EIN: String,
	name: String,
	'causes_area': [String],
	locations: [String],
	missionStatement: String,
	contactInfo: Object,
	rate: Number,
	picture: String,
	currentOpportunities: [{ type: Schema.Types.ObjectId, ref: 'Opportunity' }],
	pastOpportunities: [{ type: Schema.Types.ObjectId, ref: 'Opportunity' }],
	owners: [{ type: Schema.Types.ObjectId, ref: 'Volunteer' }]
});

var Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
