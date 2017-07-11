Template.mainpage.onCreated(function(){
	$('.tooltipped').tooltip({delay: 50});
});
Template.mainpage.onRendered(function() {
	$('.button-collapse').sideNav();
	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: '', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    //$(".dropdown-button").dropdown();
	$('#modal1').modal();
	//$('.tooltipped').tooltip({delay: 50});
	$('ul.tabs').tabs();
	//$(".panelForm").css("opacity",0);
	
});
Template.mainpage.helpers({
	contNot : function(){
		var vistas = NVISTAS.find({visto:false}).fetch();
		var noti = {$or:[{p:'123'}]};
			
		for (var i = 0; i < vistas.length; i++) {
			noti.$or.push({_id:vistas[i].idNot});
		}
		var noti = NOTIFICACIONES.find(noti).fetch().length;
		var notir = NOTIFICACIONESR.find({visto:false}).fetch().length;
		//console.log(noti);
		return notir+noti;
	},
	listanoti : function(){
		
		return NOTIFICACIONES.find().fetch().reverse();
	},
	nCurso: function(){
		return CURSOS.findOne({_id:this.idCur});
	},
	nUser : function(){
		return Meteor.users.findOne({_id:this.idUs});
	},
	nPreg : function(){
		
		return PREGUNTAS.findOne({_id:this.idPre});
	},
	notiVisto:function(){
		//console.log(this);
		var verif = NVISTAS.find({idUs:Meteor.userId(),idNot:this._id,visto:false}).fetch().length;
		//console.log(verif);
		if (verif>0) {
			return true;
		}
		return false;
	},
	listaNotiR : function(){
		return NOTIFICACIONESR.find().fetch().reverse();
	},
	contNotR : function(){		
		return NOTIFICACIONESR.find().fetch().length;
	},
	nRes : function(){		
		return RESPUESTAS.findOne({_id:this.idRes});
	},
	notirVisto:function(){
		//console.log(this);
		var verif = NOTIFICACIONESR.find({_id:this._id,visto:false}).fetch().length;
		//console.log(verif);
		if (verif>0) {
			return true;
		}
		return false;
	},
	
});


Template.mainpage.events({	
	"click #login" : function(){
		//$(".panelForm").css("opacity",1);
		$(".panelForm").fadeIn('slow');
	},
	"click #logout" : function(e){
		e.preventDefault();
		Meteor.call('setOnOffLine', false);
		Meteor.logout();

		$(".panelLogout").fadeOut('slow');
		FlowRouter.go('/')
	},
	"click .logout" : function(){
		//$(".panelForm").css("opacity",1);
		$(".panelLogout").fadeToggle('slow');
		setTimeout(function(){
			$(".panelLogout").fadeOut('slow');
		},5000);
	},
	'click .verlistanoti': function () {
		$('.listanoti').slideToggle('slow');
	},
	'click .irnoti': function () {
		//console.log(this);
		var cur = this.idCur;
		var pre = this.idPre;
		Meteor.call('getOwn', cur, function (error, result) {
			if (result) {
				FlowRouter.go('/curso',1,{cur:cur,own:result});
			}
		});
		//$('#'+pre).click(); mandar desde onrendered pos y slide
		Meteor.call('checkVisto', this._id);
		$('.listanoti').slideUp('slow');
		//console.log(this._id);
	},
	'click .visto': function () {
		Meteor.call('checkVisto', this._id);
	},
	'click .irnotir': function () {
		//console.log(this);
		var cur = this.idCur;
		var pre = this.idPre;
		Meteor.call('getOwn', cur, function (error, result) {
			if (result) {
				FlowRouter.go('/curso',1,{cur:cur,own:result});
			}
		});
		//$('#'+pre).click(); mandar desde onrendered pos y slide
		Meteor.call('checkVistoR', this._id);
		$('.listanoti').slideUp('slow');
		
	},
	'click .vistor': function () {
		//console.log(this);
		Meteor.call('checkVistoR', this._id);
	}
});
Template.welcome.events({
	'click button': function (e) {
		var id = e.target.id;
		//console.log(id);
		if (id=='student') {
			var conf = confirm('Esta seguro de inscribirse como Estudiante')
			if (conf==true) {
				Meteor.call('insertRol', id);
			}
		}
		if (id=='easier'||id=='admin') {
			var verif = prompt("Porfavor introduzca el codigo de acceso...","1234")
			if (verif=="1234") {
				Meteor.call('insertRol', id);
				return true;
			}
			if (verif=="4321") {
				Meteor.call('insertRol', id);
				return true;
			}
			alert('El codigo no es correcto vuelva a intentarlo');
			
		}
		
	}
});