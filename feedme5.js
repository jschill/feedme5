List = new Meteor.Collection('list');



if (Meteor.isClient) {
    Session.set("mode", "admin");

    Template.shoppingList.adminMode = function() {
        return Session.get("mode") === "admin";
    };
    Template.shoppingList.events({
        'click #admin': function(e, t) {
            Session.set("mode", "admin");
            e.preventDefault();
        },
        'click #shoppingList': function(e, t) {
            Session.set("mode", "shoppingList");
            e.preventDefault();
        }
    });

    Template.dbView.list = function() {
        return List.find();
    };
    Template.dbView.events({
        'keypress input': function(e, t) {
            if (e.keyCode === 13) {
                var input = t.find('input');
                List.insert({name:input.value});
                input.value = '';
            }
        }
    });
    Template.dbItem.events({
        'click .del': function(e, t) {
            List.remove({_id:t.data._id});
        },
        'click input[type=checkbox]': function(e, t) {
            List.update({_id:t.data._id}, {$set: {included:t.data.included ? false : true}});
        }
    });

    Session.set("adminMode", "db");
    Template.adminView.adminDbMode = function() {
        return Session.get("adminMode") === "db";
    };
    Template.adminView.events({
        'click #adminDb': function(e, t) {
            Session.set("adminMode", "db"); 
            e.preventDefault();
        },
        'click #adminStores': function(e, t) {
            Session.set("adminMode", "stores"); 
            e.preventDefault();
        }
    });

    Template.shoppingView.list = function() {
        return List.find({included:true});
    };
    Template.shoppingItem.events({
        'click .name': function(e, t) {
            List.update({_id:t.data._id}, {$set: {checked:t.data.checked ? false : true}});
        },
       'click .del': function(e, t) {
            List.update({_id:t.data._id}, {$set: {included:false}});
        }
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
