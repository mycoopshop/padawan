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

let userSkillsEntered = ReactiveVar()

// main template

// main temp on created
Template.tsq_main.onCreated( function () {
	this.autorun(() => {
		subscribeToUsers(this)
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

Template.tsq_paste_profile.events({
	'click #tsq-enterSkillsNext': function (event, instance) {
		let userEnteredText = $('#tsq-enterSkillsTextarea').val().toString().trim()
		userSkillsEntered.set(userEnteredText.split(','))
		console.log(userSkillsEntered)
		return
	}
});
