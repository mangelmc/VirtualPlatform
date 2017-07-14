import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  //metodos
  Meteor.methods({
  	"checkAdmin" : function(user,email){
      var admin = Meteor.users.findOne({_id:this.userId,username:'admin','emails.address':'admin@gmail.com'});
      if (admin!=undefined) {
        Roles.addUsersToRoles(this.userId, ['admin']);
      }
    },
    editPerfil : function (obj){
      Meteor.users.update({_id:this.userId}, {$set:{profile:obj}});
    },    
    "insertCurso": function(obj){
        if(Meteor.userId()){ 
          var idUs=this.userId;
            CURSOS.insert(obj,function(err,res){
              if (res) {
                //console.log(res);
                INTEGRANTES.insert({idUs:idUs,idCur:res});
              }
              if (err) {console.log(err);}
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
      var idsresp = RESPUESTAS.find({idPre:id}).fetch();
      for (var i = 0; i < idsresp.length; i++) {
        PUNTUACION.remove({idObj:idsresp[i]._id});
        NOTIFICACIONESR.remove({idRes:idsresp[i]._id});
      }
      RESPUESTAS.remove({idPre : id });
      var idNot = NOTIFICACIONES.find({idPre:id}).fetch()[0]._id;
      NOTIFICACIONES.remove({idPre:id});
        NVISTAS.remove({idNot:idNot});
      PUNTUACION.remove({idObj:id});

    },
    insertRespuesta : function(obj,idUsP){
      //this,userId  ? Revisar
      var yoP = this.userId;
      RESPUESTAS.insert(obj,function(err,res){
        if (idUsP!=yoP) {
          //console.log(idUsP+'!='+yoP);
          NOTIFICACIONESR.insert({
            idUs:obj.idUs,idRes:res,idPre:obj.idPre,idCur:obj.idCur,idDes:idUsP,visto:false});
        }
        //Aqui vendria el update a pregunta.respuestas
      });

    },
    eliRespuesta : function(idResp){
      RESPUESTAS.remove({_id : idResp});
      NOTIFICACIONESR.remove({idRes:idResp});
      PUNTUACION.remove({idObj:idResp});
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
    checkVistoR : function(idNotR){

      NOTIFICACIONESR.update({_id:idNotR},{$set:{visto:true}});
      //console.log(own[0].owner);
    },
    setOnOffLine : function(estado){

      Meteor.users.update({_id:this.userId}, {$set:{'profile.online':estado}});
      //console.log(own[0].owner);
    },
    puntuar : function(obj,tipo){
      
      PUNTUACION.insert(obj);
      var cons = PUNTUACION.find({idObj:obj.idObj}).fetch();
      var total = 0;
      var cont = cons.length;
      for (var i = 0; i < cons.length; i++) {
        total+=cons[i].puntos;
      }
      var points = total/cont;
      points = points.toFixed(2);
      //console.log(points);
      if (tipo=='preg') {
        PREGUNTAS.update({_id:obj.idObj}, {$set:{total:total,cantUs:cont,puntos:points}});
      }
      if (tipo=='resp') {
        RESPUESTAS.update({_id:obj.idObj}, {$set:{total:total,cantUs:cont,puntos:points}});
       }
    },
    //esta esla parte de administracion
    bloquearUs : function(idUs,estado){
      Meteor.users.update({_id:idUs}, {$set:{'profile.bloqueado':estado}});
      //console.log(own[0].owner);
    },
    asignarRol : function(R,idUs){
      Roles.addUsersToRoles(idUs, [R]);
    },
    checkBan : function(user){
      var user = Meteor.users.findOne({_id:this.userId,'profile.bloqueado':true});
      //console.log(user.username);
      if (user!=undefined) {
        return true;
      }
      return false;
    },
    insertContent: function(obj){
      CONTENT.insert(obj);
    },

  });



  //publicaciones
  Meteor.publish("getImages",function(){
    return IMAGES.find().cursor;
    });
  
  Meteor.publishComposite("getFiles",function(idMat){
    return {
      find(){
        return CONTENT.find({idMat:idMat});
      },
      children:[{
          find(content){
            return ARCHIVOS.find({_id:content.file}).cursor;
          }          
        }]
    }
  });
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
  
  Meteor.publishComposite("getUsers",function(idC){
    //console.log(INTEGRANTES.find({idCur:idC}).fetch());
    return {
      find(){
        return INTEGRANTES.find({idCur:idC});

      },
      children:[{
          find(integ){
            return Meteor.users.find({_id:integ.idUs},{fields:{profile:1,username:1}});
          }          
        }]
    }
  });
  Meteor.publishComposite("getnotificacionesr",function(){
    return {
      find(){
        return NOTIFICACIONESR.find({idDes:this.userId});
      },
      children:[{
          find(noti){
            return Meteor.users.find({_id:noti.idUs},{fields:{profile:1,username:1}});
          },
          find(noti){
            return RESPUESTAS.find({_id:noti.idRes});
          },
          find(noti){
            return PREGUNTAS.find({_id:noti.idPre});
          },
          find(noti){
            return CURSOS.find({_id:noti.idCur});
          },         
        }]
    }
  });
  Meteor.publish("getPuntuacion",function(idCur){
    return PUNTUACION.find({idCur:idCur});
  });
  
  // Publicaion para ruta usuarios
  Meteor.publish("getAllUsers",function(){
    return Accounts.users.find({_id:{$ne:this.userId}});
  });


});
