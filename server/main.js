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
    },
    insertPregunta : function(obj){
      PREGUNTAS.insert(obj);
    },
    eliPregunta : function(id){
      PREGUNTAS.remove({_id : id});
      RESPUESTAS.remove({idPre : id });
    },
    insertRespuesta : function(obj){
      RESPUESTAS.insert(obj);
    },
    eliRespuesta : function(idResp){
      RESPUESTAS.remove({_id : idResp});
    },
    insertMensaje : function(obj){
      MENSAJES.insert(obj);
    },
    eliMensaje : function(idMen){
      MENSAJES.remove({_id : idMen});
    },
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

  /* Esta es una prueba sin composite....
      si que es mas facil  
  Meteor.publish("getPreguntas",function(idC){
    return PREGUNTAS.find({idCur:idC});
  });*/
  Meteor.publishComposite("getPreguntas",function(idC){
    return {
      find(){
        return PREGUNTAS.find({idCur:idC});
      },
      children:[{
          find(preguntas){
            return Meteor.users.find({_id:preguntas.idUs});
          }          
        }]
    }
  });
  /*
  Meteor.publish("getRespuestas",function(idC){
    return RESPUESTAS.find({idCur:idC});
  });*/
  Meteor.publishComposite("getRespuestas",function(idC){
    return {
      find(){
        return RESPUESTAS.find({idCur:idC});
      },
      children:[{
          find(respuestas){
            return Meteor.users.find({_id:respuestas.idUs},{fields:{profile:1,username:1}});
          }          
        }]
    }
  });
  Meteor.publishComposite("getMensajes",function(idMat){
    return {
      find(){
        return MENSAJES.find({idMat:idMat});
      },
      children:[{
          find(mensajes){
            return Meteor.users.find({_id:mensajes.idUs},{fields:{profile:1,username:1}});
          }          
        }]
    }
  });
  
});
