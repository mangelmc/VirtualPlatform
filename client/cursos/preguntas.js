import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import "./preguntas.html" ;
//-------Funcionalidad plantilla prefuntas
var orderpreg = ''
Template.preguntas.events({
	'submit #preguntar': function (e) {
		e.preventDefault();
		obj = {
			texto : e.target.texto.value, 
			idCur : FlowRouter.getQueryParam('cur'),
			idUs : Meteor.user()._id,
			puntos : 0
		}
		//console.log(obj);
		Meteor.call('insertPregunta', obj);
		e.target.texto.value='';
	},
	'click .mejores': function () {
		alert('en construccion');
	},
	'click .nuevos': function () {
		alert('en construccion');	
	},
	'click .noresueltos': function () {
		alert('en construccion');
	}
});
Template.preguntas.helpers({
	listPreguntas: function () {
		var idCur = FlowRouter.getQueryParam('cur');
		return	PREGUNTAS.find({idCur:idCur}).fetch().reverse();
	},
	userPreg :  function () {
		return	Meteor.users.findOne({_id:this.idUs});
	},
	
});
//-------Funcionalidad plantilla itempreguntas
Template.itemPreguntas.events({
	'click .verrespuestas': function () {
		$('#'+this._id).slideToggle('slow', function() {
			
		});
	},
	'click .elipregunta': function () {
		var eli = confirm('Esta seguro de eliminar esta pregunta.....?');
		if (eli==true) {
			Meteor.call('eliPregunta', this._id);
		}
	},
	'submit .responder': function (e) {
		e.preventDefault();
		obj = {
			texto : e.target.texto.value,
			idCur : FlowRouter.getQueryParam('cur'),
			idUs : Meteor.user()._id,
			idPre : this._id,
			puntos : 0
		}
		//console.log(this.idUs);
		Meteor.call('insertRespuesta', obj,this.idUs);
		e.target.texto.value = '';
	}

});
Template.itemPreguntas.helpers({
	listRespuestas: function () {
		return RESPUESTAS.find({idPre : this._id}).fetch().reverse();
	},
	userResp : function () {
		//console.log(Meteor.users.findOne({_id:this.idUs}).username);
		return	Meteor.users.findOne({_id:this.idUs});
	},
	numRespuestas : function () {
		return	RESPUESTAS.find({idPre : this._id}).fetch().length;		
	},
	eliPermiso : function () {
		var idOwn = FlowRouter.getQueryParam('own');
		var idUsPreg = this.idUs,idUs = Meteor.userId();
		//console.log(this);
		if (idOwn==idUs||idUsPreg==idUs||Roles.userIsInRole(idUs, ['admin'])) {
			return true;
		}
		return false;

	},
});
//--------Funcionalidad template respuesta
Template.respuesta.helpers({
	respYo: function () {
		var idYo = Meteor.userId();
		if (idYo == this.idUs) {
			return true;
		}
		return	false;
	}
});
Template.respuesta.events({
	'click .elirespuesta': function () {
		//console.log(this);
		var conf = confirm('esta seguro de eliminar respuesta');
		if (conf== true) {
			Meteor.call('eliRespuesta', this._id);

		}
	},
	'click .puntrespuesta': function () {
		alert('En construccion');
	}
});
