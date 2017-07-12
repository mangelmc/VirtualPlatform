Template.loginForm.events({
	"click #registerbtn" : function(e){
		e.preventDefault();
		myTemplates.set("registerForm");
	},
	"click #close" : function(e){
		e.preventDefault();
		//$(".panelForm").css("opacity",0);
		$(".panelForm").fadeOut('fast');
	},
	"submit form" : function(e){
		Meteor.loginWithPassword(e.target.user.value,e.target.password.value,function(err,result){
			if (err) {
				//console.log('error : '+err);
				alert('"Usuario"/"email"  y/o  contraseña incorrectos...!');
				
			}else{
				FlowRouter.go('/cursos');
				$(".panelForm").fadeOut(1000);
				Meteor.call('setOnOffLine', true);
			}
		});
		
		e.target.user.value='';e.target.password.value='';
		
		return false;
	}
	
 
});