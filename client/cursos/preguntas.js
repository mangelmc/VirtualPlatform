import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import "./preguntas.html" ;
//-------Funcionalidad plantilla prefuntas
var orderpreg = new ReactiveVar('nuevos');
Template.preguntas.events({
	'submit #preguntar': function (e) {
		e.preventDefault();
		obj = {
			texto : e.target.texto.value, 
			idCur : FlowRouter.getQueryParam('cur'),
			idUs : Meteor.user()._id,
			puntos : 0,
			total : 0,
			cantUs : 0
		}
		//console.log(obj);
		Meteor.call('insertPregunta', obj);
		e.target.texto.value='';
	},
	'click .masptos': function () {
		orderpreg.set('masptos');
	},
	'click .nuevos': function () {
		orderpreg.set('nuevos');	
	},
	'click .noresueltos': function () {
		orderpreg.set('noresueltos');
	},
	'click .masptdos': function () {
		orderpreg.set('masptdos');
	}
});
Template.preguntas.helpers({
	listPreguntas: function () {
		var idCur = FlowRouter.getQueryParam('cur');
		if (orderpreg.get()=='masptos') {
			return	PREGUNTAS.find({idCur:idCur},{sort:{puntos:-1}});
		}
		if (orderpreg.get()=='nuevos') {
			return	PREGUNTAS.find({idCur:idCur}).fetch().reverse();
		}
		if (orderpreg.get()=='noresueltos') {}
		if (orderpreg.get()=='masptdos') {
			return	PREGUNTAS.find({idCur:idCur},{sort:{cantUs:-1}});
		}		
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
			puntos : 0,
			total : 0,
			cantUs : 0
		}
		//console.log(this.idUs);
		Meteor.call('insertRespuesta', obj,this.idUs);
		e.target.texto.value = '';
	},
	'click .puntuarpreg': function (e) {
		e.preventDefault();
		id = '#'+this._id+'p';
		$(id).fadeToggle('slow');
		setTimeout(function(){
			$(id).fadeOut('slow');
		},6000);
	},
	'click .puntr': function (e) {
		
		var obj ={
			idUs : Meteor.userId(),
			idObj : this._id,
			puntos : parseInt(e.currentTarget.id),
			idCur : FlowRouter.getQueryParam('cur'),
		}
		Meteor.call('puntuar',obj,'preg');
		$('#'+this._id+'p').fadeOut('slow');
		//console.log(obj);
		
	},
	'mouseover .puntr' : function (e) {
		var val = parseInt(e.currentTarget.id);
		//console.log($('#'+this._id+' .punt'));
		$('#'+this._id+'p .puntr').each(function(){
			if ($(this).attr('id')<=val) {
				$(this).css('background-color', 'green');
				//reto cambiar el color del grade ;
			}			
		});		
	},
	'mouseout .puntr' : function (e) {
		var val = parseInt(e.currentTarget.id);
		$('#'+this._id+'p .puntr').each(function(){
			$(this).css('background-color', 'transparent');					
		});		
	},

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
	puntuado : function(){
		//var idCur = FlowRouter.getQueryParam('cur'); 
		var rowpunt = PUNTUACION.find({idUs:Meteor.userId(),idObj:this._id}).fetch();
		//console.log(rowpunt);
		if (rowpunt.length>0) {
			return false;
		}
		return true;
	},
	puntYo : function(){
		//console.log(this.idUs);
		if (this.idUs == Meteor.userId()) {
			return true;
		}
		return false;
	}
});
//--------Funcionalidad template respuesta
Template.respuesta.helpers({
	respYo: function () {
		var idYo = Meteor.userId();
		if (idYo == this.idUs) {
			return true;
		}
		return	false;
	},
	Puntuado : function(){
		//var idCur = FlowRouter.getQueryParam('cur'); 
		var rowpunt = PUNTUACION.find({idUs:Meteor.userId(),idObj:this._id}).fetch();
		//console.log(rowpunt);
		if (rowpunt.length>0) {
			return false;
		}
		return true;
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
	'click .puntuarresp': function (e) {
		e.preventDefault();
		var id = '#'+this._id+'r';
		$(id).fadeToggle('slow');
		setTimeout(function(){
			$(id).fadeOut('slow');
		},6000);
	},
	'click .punt': function (e,temp) {
		
		var obj ={
			idUs : Meteor.userId(),
			idObj : this._id,
			puntos : parseInt(e.currentTarget.id),
			idCur : FlowRouter.getQueryParam('cur'),
		}
		Meteor.call('puntuar',obj,'resp');
		$('#'+this._id+'r').fadeOut('slow');
		//console.log(obj);
		
	},
	'mouseover .punt' : function (e) {
		var val = parseInt(e.currentTarget.id);
		//console.log($('#'+this._id+' .punt'));
		$('#'+this._id+'r .punt').each(function(){
			if ($(this).attr('id')<=val) {
				$(this).css('background-color', 'grey');
				//reto cambiar el color del grade ;
			}			
		});		
	},
	'mouseout .punt' : function (e) {
		var val = parseInt(e.currentTarget.id);
		$('#'+this._id+'r .punt').each(function(){
			$(this).css('background-color', 'transparent');					
		});		
	},
	

});
