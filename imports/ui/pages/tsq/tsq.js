import './tsq.html'
import { Template } from 'meteor/templating'
import { User } from '/imports/api/users/users.js'
import { ReactiveVar } from 'meteor/reactive-var'

// subs
const subscribeToUsers = function (self) {
    self.subscription = self.subscribe('users', {
        onStop: console.log('onstop'),
        onReady: console.log('onready')
    })
    return self
}

let testData = {
	skillList: 'python, mongo, sql, javascript, c#'
}

let userSkillsInformation = testData.skillList
let userSkillsEntered = new ReactiveVar();
let userSkillsListCurrent;

let status = {
	word: 'testing',
	color: 'success',
}

// main template


// main temp on created
Template.tsq_main.onCreated( function () {
	this.autorun(() => {
		subscribeToUsers(this)
		userSkillsEntered.set(testData.skillList.split(','))
	})
})

// main temp helpers
Template.tsq_main.helpers({
	noCurrentTSQ(){
		console.log('noCurrentTSQ returns true right now as a default')
		return true
	}
});


// tsq new template

// first time tsq workflow
Template.tsq_new.helpers({
	noEnteredText() {
		console.log('returning true for now')
		return true
	}
});


// enter skill textarea and next button
Template.tsq_pasteProfile.rendered = function () {
	let textarea = $('#tsq-enterSkillsTextarea')
		textarea.val(testData.skillList)
};

Template.tsq_pasteProfile.helpers({
	showStatusWord () {
		return status.word
	},
	showSTatusColor () {
		return status.color
	}
})

Template.tsq_pasteProfile.events({
	'click #tsq-enterSkillsNext': function (event, instance) {
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
