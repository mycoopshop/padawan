import './tsq.html'
import { Template } from 'meteor/templating'
import { User } from '/imports/api/users/users.js'
import { ReactiveVar } from 'meteor/reactive-var'

/**
 * Variables/Constants
 */

// static test data
let testData = {
	skillList: 'python, mongo, sql, javascript, c#'
}

let userSkillsInformation = testData.skillList
let userSkillsEntered = new ReactiveVar();
let userSkillsListCurrent;

// the default for this should actually be true unless the user has tsq data already
let addSkills = new ReactiveVar(false)
let alreadyHasSkills = new ReactiveVar(true)

// this is for a status notifier but I commented it out because it might be overkill
let status = {
	word: 'testing',
	color: 'success',
}

/**
 * Functions
 */


// subs
const subscribeToUsers = function (self) {
    self.subscription = self.subscribe('users', {
        onStop: console.log('onstop'),
        onReady: console.log('onready')
    })
    return self
}

/**
 * Templates
 */

// main temp
Template.tsq_main.onCreated( function () {
	this.autorun(() => {
		subscribeToUsers(this)
		userSkillsEntered.set(testData.skillList.split(','))
	})
})


// main temp helpers
Template.tsq_main.helpers({
	// renamed from noCurrentTSQ. represents whether user wants to add skills / doesn't currently have any
	addSkills(){
		return addSkills.get()
	}
});


// add skills tsq workflow
Template.tsq_addSkills.helpers({
	noEnteredText() {
		console.log('returning true for now')
		return true
	}
});


// tsq current template
Template.tsq_current.events({
	'click #tsq-addMoreSkills': function (event, instance) {
		addSkills.set(true)
	}
})


// enter skill textarea and next button
Template.tsq_pasteProfile.rendered = function () {
	let textarea = $('#tsq-enterSkillsTextarea')
		textarea.val(testData.skillList)
};


Template.tsq_pasteProfile.helpers({
	alreadyHasSkills () {
		return alreadyHasSkills.get()
	},
	showStatusWord () {
		return status.word
	},
	showSTatusColor () {
		return status.color
	}
})


Template.tsq_pasteProfile.events({
	'click .tsq-enterSkillsContinue': function (event, instance) {
		let userEnteredText = $('#tsq-enterSkillsTextarea').val().toString().trim()
		userSkillsEntered.set(userEnteredText.split(','))
		console.log(userSkillsEntered)
		return
	}
});


Template.tsq_userSkillsList.helpers({
	showSkills() {
		return userSkillsEntered.get().join(',')
	}
})
