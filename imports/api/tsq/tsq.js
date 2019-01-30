import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {Class} from 'meteor/jagi:astronomy'

const TSQ = Class.create({
	name: 'tsq',
	collection: Mongo.collection('tsq_data')
	fields: {
		data: {
			type: Array,
		}
	}
})


