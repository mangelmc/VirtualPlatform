import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './preguntas.html';

Template.preguntas.events({
	'submit #preguntar': function (e) {
		e.preventDefault();
		var idC = FlowRouter.getQueryParam('idCur');
		obj = {}
		console.log(this);
	}
});