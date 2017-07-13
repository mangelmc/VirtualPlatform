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
		var user = e.target.user.value;
		Meteor.loginWithPassword(user,e.target.password.value,function(err,result){
			if (err) {
				//console.log('error : '+err);
				alert('"Usuario"/"email"  y/o  contraseña incorrectos...!');
				
			}else{
				Meteor.call('checkBan', user, function (error, result) {
					if (result==true) {
						alert('Oops...Tu cuenta esta bloqueada temporalmente');
						Meteor.logout();
						$(".panelForm").fadeOut(1000);
					}
					else{
						FlowRouter.go('/cursos');
						$(".panelForm").fadeOut(1000);
						Meteor.call('setOnOffLine', true);
					}
				});

				
			}
		});
		
		e.target.user.value='';e.target.password.value='';
		
		return false;
	}
	
 
});