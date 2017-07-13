
Template.registerForm.onRendered(function(){
	$("select").material_select();
});
Template.registerForm.events({
	"click #return" : function(){
		myTemplates.set("loginForm");
	},
	"click #close" : function(){
		//$(".panelForm").css("opacity",0);
		$(".panelForm").fadeOut('slow');
		myTemplates.set("loginForm");
	},
	"submit form" : function(e){
		e.preventDefault();
		
	 	var user = {
			"username" : e.target.username.value,
			"email" : e.target.email.value,
			"password" : e.target.password.value,
			"profile" : {
				"name" : e.target.name.value,
				"surname" : e.target.surname.value,
				"carrera" : e.target.carrera.value,
				"online" : true,
				"bloqueado" : false
				}
			};
			
		Accounts.createUser(user, function(e){
			if(e == undefined){
				Meteor.loginWithPassword(user.username,user.password);
				//Roles.setUserRoles(Meteor.user()._id, ['estudiante'], 'user');
				$(".panelForm").fadeOut('slow');
				myTemplates.set("loginForm");
				
				Meteor.call('checkAdmin', 1);
				FlowRouter.go('/');
			}else{
				alert(e.reason);
				//console.log(e);
				return;
			}
							
		});
		
		
		}	
});