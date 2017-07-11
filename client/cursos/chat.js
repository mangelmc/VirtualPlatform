
var usersOnline = new ReactiveVar(1);
Template.chat.onRendered(function(){

})
Template.chat.events({
	/*'click #closechat': function () {
		$('#chatlayout').slideToggle('slow');
		$('#asklayout').slideToggle('slow');
	},*/
	'submit #chatear': function (e) {
		e.preventDefault();
		obj = {
			idUs : Meteor.userId(),
			texto : e.target.texto.value,
			idMat : FlowRouter.getQueryParam('idMat'),
		}
		//console.log(obj);
		Meteor.call('insertMensaje', obj);
		e.target.texto.value='';
		var alto= $('#listausers').offset().top;
		
		$('body').animate({scrollTop: alto}, 1500);
		$('.msjcont').animate({scrollTop: 0}, 1500);

	},
	'click #listausers': function (e) {
		e.preventDefault();
		
		$('.listausers').slideToggle('slow');
		setTimeout(function(){$('.listausers').slideUp('slow');},10000);
		
		
	}
});
Template.chat.helpers({
	listMensajes: function () {
		return MENSAJES.find({}).fetch().reverse();
	},
	userMens : function(){
		return Meteor.users.findOne({_id: this.idUs});
	},
	usersOnline : function () {
		
		//console.log(Meteor.users.find({'profile.online':true}).fetch());
		return usersOnline.get();
	},
	countOnline : function () {
		var idCur = FlowRouter.getQueryParam('cur');
		var int = INTEGRANTES.find({idCur:idCur}).fetch();
		var obj = {};obj.$or=[{p:1}];
		for (var i = 0; i < int.length; i++) {
			obj.$or.push({_id:int[i].idUs});
		}
		var users = Meteor.users.find({$and:[{'profile.online':true},obj]}).fetch();
		usersOnline.set(users);
		//console.log(Meteor.users.find({$and:[{'profile.online':true},obj]}).fetch().length);
		return users.length;
	},

});
Template.mensaje.helpers({
	idMi: function () {
		if (Meteor.userId()==this.idUs) {
			return true;
		}
		return false;

	}
});
Template.mensaje.events({
	'click .elimensaje': function () {
		var conf = confirm('Seguro que quiere eliminar este mensaje');
		if (conf==true) {
			Meteor.call('eliMensaje', this._id);
		}
	}
});