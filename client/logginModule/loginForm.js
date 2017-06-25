Template.loginForm.events({
	"click #registerbtn" : function(e){
		e.preventDefault();
		myTemplates.set("registerForm");
	},
	"click #close" : function(e){
		e.preventDefault();
		//$(".panelForm").css("opacity",0);
		$(".panelForm").fadeOut('slow');
	},
	"submit form" : function(e){
		Meteor.loginWithPassword(e.target.user.value,e.target.password.value,function(err,result){
			if (err) {
				console.log('error : '+err);
				alert('Usuario o contraseña incorrectos...!');
				
			}else{
				
				$(".panelForm").fadeOut('slow');
			}
		});
		//$(".panelForm").css("opacity",0);
		e.target.user.value='';e.target.password.value='';
		FlowRouter.go('/cursos');
		return false;
	}
 
});