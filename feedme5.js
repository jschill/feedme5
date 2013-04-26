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
        'click span': function(e, t) {
            List.remove({_id:t.data._id});
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
