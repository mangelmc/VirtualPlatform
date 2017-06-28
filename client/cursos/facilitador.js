import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import "./facilitador.html" ;

Template.facilitador.events({
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
