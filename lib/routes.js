FlowRouter.route("/",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"home"});
	}
});

FlowRouter.route("/cursos",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"cursos"});
	}
});
FlowRouter.route("/material",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"material"});
	}
});
