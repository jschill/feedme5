/*global Meteor, Session, Template, List */

(function () {
	"use strict";
	Meteor.startup(function () {
		Deps.autorun(Template.shoppingView.list);
	});

	Template.shoppingView.list = function () {
		var store = Session.get("shopByStore"), sortInfo = {}, sort = {};
		if (store) {
			sortInfo[store] = 1;
			sort = {sort: sortInfo};
		}
		return List.find({included: true}, sort);
	};

	Template.shoppingItem.events({
		'click .name': function (e, t) {
			List.update({_id: t.data._id}, {$set: {checked: t.data.checked ? false : true}});
		},
		'click .del': function (e, t) {
			List.update({_id: t.data._id}, {$set: {included: false}});
		}
	});

	Template.shopByStore.events({
		'click .name': function (e, t) {
			Session.set("shopByStore", t.data._id);
		}
	});

	Template.shopByStore.selected = function() {
		var id = Session.get('shopByStore');
		return id === this._id;
	};

}());