import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  //metodos
  Meteor.methods({
  	"insertRol" : function(tipo){
      Roles.addUsersToRoles(this.userId, [tipo]);
      
    },
    "insertCurso": function(title,desc){
        if(Meteor.userId()){ 
            CURSOS.insert({titulo: title,descripcion:desc,owner:this.userId});
            
        }
    },
    "tomarCurso": function(obj){
        if(Meteor.userId()){ 
            INTEGRANTES.insert(obj);  
        }
    },
    "eliCurso" : function(idC){
      if (Roles.userIsInRole(this.userId, ['easier','admin'])) {
        INTEGRANTES.remove({idCur: idC});
        CURSOS.remove({_id: idC/*,owner:this.userId*/});
      }
    },
    "insertMaterial" : function(obj){
      if (Roles.userIsInRole(this.userId, ['easier','admin'])) {
        MATERIAL.insert(obj);
      }
    },
    editMaterial : function (id,obj){
      MATERIAL.update({_id:id},{$set:obj});
      
    },
    eliMaterial : function (id){
      MATERIAL.remove({_id:id});
    }
  });
  //publicaciones
  Meteor.publish('getCursos', function () {
    if (Roles.userIsInRole(this.userId, ['easier'])) {
      return CURSOS.find({owner:this.userId});
    } else {
      return CURSOS.find();
    }
  });
  Meteor.publish("getCurso",function(idCur){
		return CURSOS.find({_id:idCur});
	  });
  Meteor.publish("getInteg",function(){
    return INTEGRANTES.find({idUs:this.userId});
  });
  Meteor.publish("getMaterial",function(idC){
    return MATERIAL.find({idCur:idC});
  });
});
