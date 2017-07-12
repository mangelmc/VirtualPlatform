Template.perfil.onRendered(function(){
	
	$('.modal').modal();
});
Template.perfil.helpers({
	user: function () {
		return Meteor.users.findOne({_id:Meteor.userId()});
	}
});
Template.perfil.events({
	'submit .editperfil': function (e) {
		e.preventDefault();
		
		obj = {
			name: e.target.name.value,
			surname: e.target.surname.value,
			carrera: e.target.carrera.value
		}
		//aqui faltaria algo mas en control
		Meteor.call('editPerfil',obj);
		$('#editperfil').modal('close');
	}
});