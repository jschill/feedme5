/*global Meteor, Session, Template, $ */

List = new Meteor.Collection('list');
Stores = new Meteor.Collection('stores');

(function () {
    "use strict";
    


    if (Meteor.isClient) {
        Session.set("mode", "admin");
    
        Template.shoppingList.adminMode = function () {
            return Session.get("mode") === "admin";
        };
        Template.shoppingList.events({
            'click #admin': function (e, t) {
                Session.set("mode", "admin");
                e.preventDefault();
            },
            'click #shoppingList': function (e, t) {
                Session.set("mode", "shoppingList");
                e.preventDefault();
            }
        });
    
        Template.dbView.list = function () {
            return List.find();
        };
        Template.dbView.events({
            'keypress input': function (e, t) {
                if (e.keyCode === 13) {
                    var input = t.find('input');
                    List.insert({name: input.value});
                    input.value = '';
                }
            }
        });
        Template.dbItem.events({
            'click .del': function (e, t) {
                List.remove({_id: t.data._id});
            },
            'click input[type=checkbox]': function (e, t) {
                List.update({_id: t.data._id}, {$set: {included: t.data.included ? false : true}});
            }
        });
    
        Session.set("adminMode", "db");
        Template.adminView.adminDbMode = function () {
            return Session.get("adminMode") === "db";
        };
        Template.adminView.events({
            'click #adminDb': function (e, t) {
                Session.set("adminMode", "db");
                e.preventDefault();
            },
            'click #adminStores': function (e, t) {
                Session.set("adminMode", "stores");
                e.preventDefault();
            }
        });
    
        Template.shoppingView.list = function () {
            var store = Session.get("shopByStore"), sortInfo = {};
            if( store ) {
                sortInfo[store] = 1;
            }
            return List.find({included: true}, {sort: sortInfo});
        };
        
        Deps.autorun(Template.shoppingView.list);
        
        Template.shoppingItem.events({
            'click .name': function (e, t) {
                List.update({_id: t.data._id}, {$set: {checked: t.data.checked ? false : true}});
            },
            'click .del': function (e, t) {
                List.update({_id: t.data._id}, {$set: {included: false}});
            }
        });
        
        Template.storeView.stores = Template.shoppingView.stores = function () {
            return Stores.find();
        };
        
        Template.shopByStore.events({
            'click .name': function (e, t) {
                Session.set("shopByStore", t.data._id);
            }
        });

        Template.storeView.storeName = function() {
            return Session.get("storeName");
        }

        Template.storeView.events({
            'keypress input': function (e, t) {
                if (e.keyCode === 13) {
                    var input = t.find('input');
                    Stores.insert({name: input.value});
                    input.value = '';
                }
            }
        });
        
        Template.storeList.events({
            'click .name': function (e, t) {
                Session.set("store", t.data._id);
                Session.set("storeName", t.data.name);
            },
            'click .del': function (e, t) {
                Stores.remove({_id: t.data._id});
                //clean up to remove from the List database
            }
        });

        
        Template.storeView.rendered = function () {
            $('ul[data-sortable="true"]').sortable({stop: function (event, ui) {
                var setInfo = {};
                $(ui.item).parent().find('li').each(function (index, item) {
                    setInfo[Session.get("store")] = index;
                    List.update({_id: $(item).attr('data-id')}, {$set: setInfo});
                });
            }});
        };

        Template.storeView.storeSet = function () {
            return !!Session.get("store");
        }
        
        Template.storeView.list = function () {
            var store = Session.get("store"), sortInfo = {};
            if( store ) {
                sortInfo[store] = 1;
                return List.find({}, {sort: sortInfo});
            }
        };

    }
    
    if (Meteor.isServer) {
        Meteor.startup(function () {
        // code to run on server at startup
        });
    }
}());
