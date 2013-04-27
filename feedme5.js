/*global Meteor, Session, Template, $ */

List = new Meteor.Collection('list');
Stores = new Meteor.Collection('stores');

(function () {
	"use strict";
	
	if (Meteor.isClient) {
	
	
		

	}
	
	if (Meteor.isServer) {
		Meteor.startup(function () {
		// code to run on server at startup
		});
	}
}());
