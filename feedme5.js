List = new Meteor.Collection('list');

if (Meteor.isClient) {
    Template.shoppingList.events({
        'keypress input': function(e, t) {
            if (e.keyCode === 13) {
                var input = t.find('input');
                List.insert({name:input.value});
                input.value = '';
            }
        }
    });
    Template.item.events({
        'click .del': function(e, t) {
            List.remove({_id:t.data._id});
        },
        'click .name': function(e, t) {
            List.update({_id:t.data._id}, {$set: {checked:t.data.checked ? false : true}});
        }
    });
    Template.shoppingList.list = function() {
        return List.find();
    };
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
