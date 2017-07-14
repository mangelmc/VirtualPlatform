Template.perfil.onRendered(function(){
	
	$('.modal').modal();
});
Template.perfil.helpers({
	user: function () {
		return Meteor.users.findOne({_id:Meteor.userId()});
	},
	haveImg: function(e,temp){
		var user = Meteor.users.findOne({_id:Meteor.userId()});
		if (user.profile.img!='none') {
			return IMAGES.findOne({_id:user.profile.img});
		}
		return false;
	}
});
Template.perfil.events({
	'submit .editperfil': function (e) {
		e.preventDefault();
		
		obj = {
			name: e.target.name.value,
			surname: e.target.surname.value,
			carrera: e.target.carrera.value,
			img : idImagen.get()
		}
		//aqui faltaria algo mas en control
		Meteor.call('editPerfil',obj);
		$('#editperfil').modal('close');
		idImagen.set('none');
	}
});