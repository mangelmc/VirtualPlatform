
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
	},
	"submit form" : function(e){
		
		var user = {
			"username" : e.target.username.value,
			"email" : e.target.email.value,
			"password" : e.target.password.value,
			"profile" : {
				"name" : e.target.name.value,
				"surname" : e.target.surname.value,
				"carrera" : e.target.carrera.value,
				"estado" : "activo"
				}
			};
			
			Accounts.createUser(user, function(e){
				if(e == undefined){
					Meteor.loginWithPassword(user.username,user.password);
					//Roles.setUserRoles(Meteor.user()._id, ['estudiante'], 'user');
				}else{
					alert('error en los datos vuelva a intentarlo');
					return;
				}
								
			});
			$(".panelForm").fadeOut('slow');
			myTemplates.set("loginForm");
			FlowRouter.go('/');

			return false;
		}	
});