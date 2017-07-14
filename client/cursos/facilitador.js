import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import "./facilitador.html" ;

Template.facilitador.events({
	'submit #formcrearc': function (e) {
    	e.preventDefault();
    	
        var ini = Date.parse(e.target.ini.value);        
        var fin = Date.parse(e.target.fin.value);
        
        var f = new Date();
        var m =f.getMonth()+1;
        
        if (m<10) {
            m = '0'+m;
        }
        var d = f.getDate();
        if (d<10) {
            d = '0'+d;
        }
        var fa = f.getFullYear()+'-'+m+'-'+d;
        
        var fActual=Date.parse(fa);
        if (ini<fActual) {
            alert('la fecha de inicio debe ser mayor o igual a la actual');
            return;
        }
        if (fin<=ini) {
            alert('la fecha debe ser mayor a la fecha de inicio');
            return;
        }
        var obj = {
            titulo: e.target.title.value,
            descripcion : e.target.desc.value,
            owner : Meteor.userId(),
            ini : e.target.ini.value,
            fin : e.target.fin.value,
            img : idImagen.get()
        }
        //console.log(obj);
        Meteor.call('insertCurso',obj,);
        idImagen.set('none');
    	$('#formcurso').slideUp('slow');
        $('#formcrearc')[0].reset(); 
    },
    'click .verformcurso': function () {
        $('#formcurso').slideToggle('slow');
        
    }
});
