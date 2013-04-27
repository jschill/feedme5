/*global Meteor, Session, Template, List */

(function () {
	"use strict";
	Meteor.startup(function () {
		Deps.autorun(Template.shoppingView.list);
	});

	Session.set("viewing", true);

	Template.shoppingView.viewing = function () {
		return Session.get("viewing");
	}

	Template.shoppingView.list = function () {
		var store = Session.get("shopByStore"), sortInfo = {}, sort = {};
		if (store) {
			sortInfo[store] = 1;
			sort = {sort: sortInfo};
		}
		return List.find({included: true}, sort);
	};

	Template.shoppingView.events({
		'click a[data-editMode="true"]': function (e, t) {
			Session.set("viewing", !Session.get("viewing"));
			e.preventDefault();
		}
	});

	Template.viewShoppingItem.events({
		'click .name': function (e, t) {
			List.update({_id: t.data._id}, {$set: {checked: t.data.checked ? false : true}});
		}
	});

	Template.shoppingView.editList = function () {
		var store = Session.get("shopByStore"), sortInfo = {}, sort = {};
		if (store) {
			sortInfo[store] = 1;
			sort = {sort: sortInfo};
		}
		return List.find({}, sort);
	};

	Template.editShoppingItem.events({
		'click input[type=checkbox], click .name': function (e, t) {
			List.update({_id: t.data._id}, {$set: {included: t.data.included ? false : true}});
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