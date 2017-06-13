Template.registerForm.onRendered(function(){
	$("select").material_select();
});
Template.registerForm.events({
	"click #return" : function(){
		myTemplates.set("loginForm");
	},
	"click #close" : function(){
		$(".panelForm").css("opacity",0);
	},
	"submit form" : function(e){
		
		var user = {
			"username" : e.target.username.value,
			"email" : e.target.email.value,
			"password" : e.target.password.value,
			"profile" : {
				"contry" : e.target.country.value
				}
			};
			
			Accounts.createUser(user, function(e){
				if(e == undefined){
					Meteor.loginWithPassword(user.username,user.password);	
				}
								
			});
			return false;
		}	
});