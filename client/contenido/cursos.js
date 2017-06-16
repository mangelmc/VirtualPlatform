import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './cursos.html';
Template.cursos.onCreated(function(){
        Meteor.subscribe('getCursos');
});

Template.cursos.helpers({
    
    listCursos(){
        return CURSOS.find().fetch();
    },
});

Template.cursos.events({
    'click .cursos': function(e){
        e.preventDefault();
        alert('click');
        //userId.set(e.target.);
        //var idUser= e.target.id;
        //console.log(AMIGOS.find({$and:[{idUser:Meteor.userId()},{aceptado:true}]}).fetch());
        //console.log(idUser);
       /* Meteor.call('agregarAmigo', idUser, function(error,result){
            if (error) {
                alert(error.msj);
            }
            if (result) {
                alert(result.msj);
            }
        });*/
        //alert("Se envio la solicitud");
    },
    'submit #formcrearc': function (e) {
    	e.preventDefault();
    	//console.log('crear');
    	var title = e.target.title.value;
    	var desc = e.target.desc.value;
    	//alert(title+desc);
    	Meteor.call('insertCurso', title,desc, function (error, result) {
    		if (result) {
    			console.log('ok insm');
    		}
    		if (error) {
    			console.log('error'+error);
    		}
    	});
    	e.target.title.value = "";
		e.target.desc.value ="" ; 
    }
});