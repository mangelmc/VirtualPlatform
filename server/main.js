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
          var idUs = this.userId;
            CURSOS.insert({titulo: title,descripcion:desc,owner:idUs},function(err,res){
              if (res) {
                //console.log(res);
                INTEGRANTES.insert({idUs:idUs,idCur:res});
              }
            });            
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
      var int = INTEGRANTES.find({idCur:obj.idCur,idUs:{$ne:this.userId}},{fields:{idUs:1}}).fetch();
      //console.log(int);

      PREGUNTAS.insert(obj,function(error,result){
        if (result) {
          NOTIFICACIONES.insert({
            aviso:'pregunto',idUs:obj.idUs,idPre:result,idCur:obj.idCur},function(error,result){
              for (var i = 0;i<int.length; i++) {
                NVISTAS.insert({idNot:result,idUs:int[i].idUs,visto:false});
              }
              //console.log(result+error);
            });
          
        }
      });
    },
    eliPregunta : function(id){
      PREGUNTAS.remove({_id : id});
      RESPUESTAS.remove({idPre : id });
      var idNot = NOTIFICACIONES.find({idPre:id}).fetch()[0]._id;
      NOTIFICACIONES.remove({idPre:id});
        NVISTAS.remove({idNot:idNot});
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
    getOwn : function(idCur){
      return CURSOS.find({_id : idCur},{fiels:{own:1}}).fetch()[0].owner;
      //console.log(own[0].owner);
    },
    checkVisto : function(idNot){

      NVISTAS.update({$and:[{idNot:idNot},{idUs:this.userId}]},{$set:{visto:true}});
      //console.log(own[0].owner);
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
  //Hacer reportar spam u ofensas
  Meteor.publishComposite("getNotificaciones",function(){
    var int = INTEGRANTES.find({idUs:this.userId}).fetch();
    var noti ={$and:[{idUs:{$ne:this.userId},$or:[{idLol:'asd'}]}]};

      for (var i = 0;i<int.length; i++) {
        noti.$and[0].$or.push({idCur:int[i].idCur});
      }
    //console.log(noti.$and[0].$or);
    
    return {
      find(){
        return NOTIFICACIONES.find(noti);
      },
      children:[
        {
          find(notif){
            return Meteor.users.find({_id:notif.idUs},{fields:{profile:1,username:1}});
          }          
        },
        {
          find(notif){
            return CURSOS.find({_id:notif.idCur});
          }
        },
        {
          find(notif){
            return PREGUNTAS.find({_id:notif.idPre});
          }
        },

      ]
    }
  });
  //probar con transform nvista y notifs
  Meteor.publish("getNotVistas",function(){
    return NVISTAS.find({idUs:this.userId});
  });
  
});
