//usar var react para lista con false o tur ya sabes
import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './material.html';
var orderMaterial = new ReactiveVar('prioridad');
Template.itemMaterial.onRendered(function(){
	
	$('.modal').modal();
});
Template.material.helpers({
	listMaterial: function () {
		if (orderMaterial.get()=='nuevo') {
			//console.log(MATERIAL.find().fetch().reverse());
			return	MATERIAL.find().fetch().reverse();			
		}
		//console.log(MATERIAL.find({},{sort:{$natural:1}}).fetch());
		return	MATERIAL.find();
	}
});
Template.material.events({
	'submit #addmaterial': function (e) {
		e.preventDefault();
		var idCur = FlowRouter.getQueryParam('idCur');
		var obj = {
			tema: e.target.tema.value,
			descripcion: e.target.descripcion.value,
			idCur : idCur
		}
		Meteor.call('insertMaterial', obj);
		e.target.tema.value='';
		e.target.descripcion.value='';
		//console.log(obj);		
	},
	'click #orderp': function () {
		orderMaterial.set('prioridad');
		console.log(orderMaterial.get())
	},
	'click #ordern': function () {
		orderMaterial.set('nuevo');
		console.log(orderMaterial.get())
	},
});
Template.itemMaterial.events({
	'click .verarchivos': function () {
		//console.log(this._id);
		$('#'+this._id).slideToggle('slow');
	},
	'click .cerrar': function () {
		//console.log(this._id);
		$('#'+this._id).slideToggle('slow');
	},
	'click .verchat': function () {
        //alert('verchat');
        if ($('#asklayout').css('display')=='block') {
        	FlowRouter.setQueryParams({idMat:this._id});
	        $('#asklayout').slideUp('fast',function(){
	        	$('#chatlayout').slideDown('slow');
	        	$('body').animate({scrollTop: 60}, 1500);
	        	$('#chatinput').focus();
	        });
        }else{
        	$('#chatlayout').slideUp('fast',function(){
	        	$('#asklayout').slideDown('slow');
	        });
        }
        return false;
    },
    
	'submit .editarmaterial': function (e) {
		e.preventDefault();
		var id = this._id;  
		obj = {
			tema: e.target.tema.value,
			descripcion: e.target.descripcion.value,
		}
		Meteor.call('editMaterial', id,obj);
		$('#'+this._id+'m').modal('close');

	},
	'click .eliminarmaterial': function (e) {
		var conf = confirm('Esta seguro de eliminar el Material '+this.tema);
		if (conf==true) {
		Meteor.call('eliMaterial', this._id);
		}
	},  
});
