FlowRouter.route("/",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"home"});
	}
});

FlowRouter.route("/cursos",{
	subscriptions : function(params,queryParams){
		this.register("getCursos",Meteor.subscribe('getCursos'));
		this.register("getInteg",Meteor.subscribe('getInteg'));
	},
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"cursos"});
	}
});
FlowRouter.route("/curso",{
	subscriptions : function(params,queryParams){
		this.register("getCursos",Meteor.subscribe('getCurso',queryParams.idCur));
		this.register("getMaterial",Meteor.subscribe('getMaterial',queryParams.idCur));
		this.register("getPreguntas",Meteor.subscribe('getPreguntas',queryParams.idCur));
		this.register("getRespuestas",Meteor.subscribe('getRespuestas',queryParams.idCur));
		this.register("getMensajes",Meteor.subscribe('getMensajes',queryParams.idMat));
	},
	action : function(params,queryParams) {
		//console.log(queryParams);
		BlazeLayout.render("mainpage",{banner:"banner",content:"curso"});
	}
});

