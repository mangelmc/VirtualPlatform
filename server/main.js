import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
  	"insertCurso": function(title,desc){
            if(Meteor.userId()){ 
                CURSOS.insert({titulo: title,descripcion:desc,owner:this.userId});
                return true;
            }
        }
  });

  Meteor.publish("getCursos",function(){
		return CURSOS.find({owner:this.userId});
	  });
});
