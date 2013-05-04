(function (g) {
	"use strict";

	g.Template.shoppingList.userLoggedIn = function () {
		return !!g.Meteor.userId();
	};
})(this);