Template.mainpage.onRendered(function() {
	$('.button-collapse').sideNav();
	//$(".panelForm").css("opacity",0);

});
Template.mainpage.helpers({
	username : function(){
		return Accounts.user().username;
	}
});


Template.mainpage.events({
	"click #login" : function(){
		//$(".panelForm").css("opacity",1);
		$(".panelForm").fadeIn('slow');
	},
	"click #logout" : function(){
		Meteor.logout();
		FlowRouter.go('/')
	}
});
Template.welcome.events({
	'click button': function (e) {
		var id = e.target.id;
		console.log(id);
		Meteor.call('insertRol', id, function (error, result) {
			if (result) {
				console.log('rol inserted '+result);
			}
		});
	}
});