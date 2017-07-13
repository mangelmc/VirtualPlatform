Template.usuarios.onRendered(function(){
	$('ul.tabs').tabs();
});

Template.usuarios.helpers({
	listaUsEspera: function () {
		return Meteor.users.find({roles:undefined,_id:{$ne:Meteor.userId()}});
	},
	listaUsAceptados: function () {
		return Meteor.users.find({roles:{$ne:undefined},_id:{$ne:Meteor.userId()},'profile.bloqueado':false});
	},
	listaUsBloqueados: function () {
		return Meteor.users.find({roles:{$ne:undefined},_id:{$ne:Meteor.userId()},'profile.bloqueado':true});
	}
});
Template.usuarios.events({
	'click .darbaja': function () {
		var conf = confirm('¿ Esta seguro de bloquear al usuario '+this.username+' ?');
		//console.log(this.username);
		if (conf==true) {
		Meteor.call('bloquearUs', this._id,true);
		}
	},
	'click .daralta': function () {
		var conf = confirm('¿ Esta seguro de dar de alta al usuario '+this.username+' ?');
		//console.log(this.username);
		if (conf==true) {
		Meteor.call('bloquearUs', this._id,false);
		}
	},
	'click .darrol': function (e) {
		var r = e.target.id;
		var conf = confirm('¿ Esta seguro de asigar el rol '+r+' al usuario '+this.username+'?');
		//console.log(this.username);
		if (conf==true) {
		Meteor.call('asignarRol',r ,this._id);
		}
	}
});