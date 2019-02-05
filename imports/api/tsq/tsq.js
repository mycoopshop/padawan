import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {Random} from 'meteor/random'
import {Class} from 'meteor/jagi:astronomy'


const ConfidenceRubric = {
	'0': {
		prompt: 'unfamilar',
		value: 0
	},
	'1': {
		prompt: 'a month or more',
		value: 1
	},
	'2': {
		prompt: 'a week or two',
		value: 2
	},
	'3': {
		prompt: 'a couple of days',
		value: 3
	},
	'4': {
		prompt: '8 to 10 hours',
		value: 4
	},
	'5': {
		prompt: 'a couple of hours',
		value: 5
	},
	'6': {
		prompt: 'I could architect and give detailed technical leadership to a team today',
		value: 6
	}
}

const ConfidenceInfo = Class.create({
	name: 'confidence_level',
	fields: {
		language: {
			type: String,
		},
		prompt: {
			type: String,
			default: ConfidenceRubric['0'].prompt
		},
		value: {
			type: Number,
			default: ConfidenceRubric['0'].value
		}
	}
})

const LanguageInfo = Class.create({
	name: 'language_info',
	fields: {
		key: {
			type: String,
			default: function () {
				// defaults to 17 chars
				return Random.id().toString()
			}
		},
		name: {
			type: String,
		},
		confidenceLevel: {
			type: ConfidenceInfo,
		}
	}
})

const TSQ = Class.create({
	name: 'tsq',
	collection: Mongo.collection('tsq_data'),
	fields: {
		userLanguageList: {
			type: [LanguageInfo],
			default: function () { return [] }
		},
	}
	helpers: {},
	meteorMethods: {
		addLanguage (TSQId) {},
		resetUserLanguageList (TSQId) {},
		updateUserLanguageList (TSQId, LanguageInfoKey) {},
		removeUserLanguageList (TSQId, LanguageInfoKey) {},
		updateConfidenceLevelForLanguage (TSQId, LanguageInfoKey) {},
	}
})

export { ConfidenceRubric, ConfidenceInfo, LanguageInfo, TSQ }
