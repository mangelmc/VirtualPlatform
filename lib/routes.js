FlowRouter.route("/",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"contentMain"});
	}
});

FlowRouter.route("/cursos",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"contentMain"});
	}
});
