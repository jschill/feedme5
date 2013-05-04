(function(g) {

	"use strict";

	var perms = {
		insert: function(userId, doc) {
			return userId && doc.owner === userId;
		},
		update: function(userId, doc) {
			return doc && doc.owner === userId;
		},
		remove: function(userId, doc) {
			return doc && doc.owner === userId;
		}
	};
	var deny = {
		update: function(userId, docs, fields) {
			return fields.indexOf('owner') > -1;
		}
	};

	g.List = new g.Meteor.Collection('list');
	g.List.allow(perms);
	g.List.deny(deny);
	g.Stores = new g.Meteor.Collection('stores');
	g.Stores.allow(perms);
	g.Stores.deny(deny);

	if (g.Meteor.isClient) {
		g.Meteor.subscribe("list");
		g.Meteor.subscribe("stores");
	}

	if (g.Meteor.isServer) {
		g.Meteor.publish("list", function() {
			return g.List.find({
				owner: this.userId
			});
		});
		g.Meteor.publish("stores", function() {
			return g.Stores.find({
				owner: this.userId
			});
		});
	}

})(this);