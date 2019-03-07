import './tsq.html'
import { Template } from 'meteor/templating'
import { User } from '/imports/api/users/users.js'
import { ReactiveVar } from 'meteor/reactive-var'
import { ConfidenceRubric } from '/imports/api/tsq/tsq'
import { Meteor } from 'meteor/meteor'

/**
 * Variables/Constants
 */

// static test data
let testData = {
	skillList: 'python, mongo, sql, javascript, c#'
}

const USER_URL = 'http://localhost:4000/tsq/skills/users/'

let userSkillsInformation = testData.skillList
let userSkillsEntered = new ReactiveVar();
let userSkillsListCurrent;
let currentUser = new ReactiveVar();

// the default for this should actually be true unless the user has tsq data already
let addSkills = new ReactiveVar(false)
let alreadyHasSkills = new ReactiveVar(true)

// this is for a status notifier but I commented it out because it might be overkill
let status = {
	word: 'testing',
	color: 'success',
}

let user;

/**
 * Functions
 */

/**
 * Templates
 */

// main temp
Template.tsq_main.onCreated(function () {
	this.autorun(() => {
		this.subscription = this.subscribe('userData', {
      onStop: function () {
          console.log("User profile subscription stopped! ", arguments, this);
      },
      onReady: function () {
          console.log("User profile subscription ready! ", arguments, this);
      }
	  });
		this.subscription2 = this.subscribe('userList', this.userId, {
	      onStop: function () {
	          console.log("User List subscription stopped! ", arguments, this);
	      },
	      onReady: function () {
	          console.log("User List subscription ready! ", arguments, this);
	      }
	  });
	  let uid = Meteor.userId()
	  user = User.findOne({_id: uid })
	})
});


// main temp helpers
Template.tsq_main.helpers({
	addSkills(){
		console.log(user.MyProfile)
		return addSkills.get()
	},
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
		// return userSkillsEntered.get().join(',')
	}
});


Template.tsq_addLanguage.helpers({
	showLang() {
		// static test data for adding more languages
		let rl = { //rl = random language
		lang: [
				'css', 'java', 'php', 'c++', '.net',
				'angular', 'vue', 'swift', 'node', 'react'
			]
		}
		console.log(rl.lang[2]);
		return rl.lang;
	}
});

