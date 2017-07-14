
FlowRouter.subscriptions = function(params,queryParams) {
        this.register("getImages",Meteor.subscribe("getImages"));
        this.register("getnotificacionesr",Meteor.subscribe("getnotificacionesr"));
        this.register("getNotificaciones",Meteor.subscribe("getNotificaciones"));
        this.register("getNotVistas",Meteor.subscribe("getNotVistas"));
        Meteor.call('checkBan', 1, function (error, result) {
			if (result) {
				alert('Usted ha sido baneado');
				Meteor.logout();
			}
		});
},
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
		
		this.register("getPuntuacion",Meteor.subscribe('getPuntuacion',queryParams.cur));
		this.register("getCursos",Meteor.subscribe('getCurso',queryParams.cur));
		this.register("getMaterial",Meteor.subscribe('getMaterial',queryParams.cur));
		this.register("getPreguntas",Meteor.subscribe('getPreguntas',queryParams.cur));
		this.register("getRespuestas",Meteor.subscribe('getRespuestas',queryParams.cur));
	},
	action : function(params,queryParams) {
		//console.log(queryParams);
		BlazeLayout.render("mainpage",{banner:"banner",content:"curso"});
	}
});
FlowRouter.route("/det_material",{
	subscriptions : function(params,queryParams){
		this.register("getPuntuacion",Meteor.subscribe('getPuntuacion',queryParams.cur));
		this.register("getUsers",Meteor.subscribe('getUsers',queryParams.cur));
		this.register("getCurso",Meteor.subscribe('getCurso',queryParams.cur));
		this.register("getMaterial",Meteor.subscribe('getMaterial',queryParams.cur));
		this.register("getPreguntas",Meteor.subscribe('getPreguntas',queryParams.cur));
		this.register("getRespuestas",Meteor.subscribe('getRespuestas',queryParams.cur));
		this.register("getMensajes",Meteor.subscribe('getMensajes',queryParams.idMat));
	},
	action : function(params,queryParams) {
		//console.log(queryParams);
		BlazeLayout.render("mainpage",{banner:"banner",content:"det_material"});
	}
});
FlowRouter.route("/usuarios",{
	subscriptions : function(params,queryParams){
		//console.log('ok');
		this.register("getAllUsers",Meteor.subscribe('getAllUsers'));
		//this.register("getInteg",Meteor.subscribe('getInteg'));
	},
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"usuarios"});
	}
});
FlowRouter.route("/perfil",{
	subscriptions : function(params,queryParams){
		//this.register("getCursos",Meteor.subscribe('getCursos'));
		//this.register("getInteg",Meteor.subscribe('getInteg'));
	},
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"perfil"});
	}
});

