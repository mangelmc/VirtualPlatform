import {Mongo} from "meteor/mongo";


CURSOS = new Mongo.Collection('cursos');

var cursosSchema =new SimpleSchema({
    
    titulo : {
        type:String,
    },
    descripcion : {
        type : String
    },
    owner : {
        type : String
    },
    ini : {
        type : Date
    },
    fin : {
        type : Date
    }
});
CURSOS.attachSchema(cursosSchema);
INTEGRANTES = new Mongo.Collection('integrantes');

var integrantesSchema =new SimpleSchema({
    
    idCur : {
        type:String,
    },
    idUs : {
        type : String
    },
});
INTEGRANTES.attachSchema(integrantesSchema);

MATERIAL = new Mongo.Collection('material');

var materialSchema =new SimpleSchema({
    tema : {
        type:String,
    },
    descripcion : {
        type : String
    },
    idCur : {
        type : String
    }, 
});
MATERIAL.attachSchema(materialSchema);

MENSAJES = new Mongo.Collection('mensajes');

var mensajesSchema =new SimpleSchema({
    
    idUs : {
        type:String,
    },
    texto : {
        type : String
    },
    idMat : {
        type : String
    }
});

MENSAJES.attachSchema(mensajesSchema);

PREGUNTAS = new Mongo.Collection('preguntas');

var preguntasSchema =new SimpleSchema({
    
    texto : {
        type:String,
    },
    idCur : {
        type : String
    },
    idUs : {
        type : String
    },
    total : {
        type : Number,
        optional:true
    },
    cantUs : {
        type : Number,
        optional : true
    },
    puntos : {
        type : Number,
        decimal : true,
        max : 6.00
    }
    
});
PREGUNTAS.attachSchema(preguntasSchema);

RESPUESTAS = new Mongo.Collection('respuestas');

var respuestasSchema =new SimpleSchema({
    
    texto : {
        type:String,
    },
    idUs : {
        type : String
    },
    idPre: {
        type : String
    },
    idCur : {
        type : String
    },
    total : {
        type : Number,
        optional:true
    },
    cantUs : {
        type : Number,
        optional : true
    },
    puntos : {
        type : Number,
        decimal : true,
        max : 6.00
    }
    
});
RESPUESTAS.attachSchema(respuestasSchema);

NOTIFICACIONES = new Mongo.Collection('notificaciones');

var notificacionesSchema =new SimpleSchema({
    aviso : {
        type:String,
    },
    idUs : {
        type : String
    },
    idPre: {
        type : String
    },
    idCur : {
        type : String
    }
    
});
NOTIFICACIONES.attachSchema(notificacionesSchema);

NVISTAS = new Mongo.Collection('nvistas');

var nvistasSchema =new SimpleSchema({
    idNot : {
        type:String,
    },
    idUs : {
        type : String
    },
    visto: {
        type : Boolean,         
    }
    
});
NVISTAS.attachSchema(nvistasSchema);

NOTIFICACIONESR = new Mongo.Collection('notificacionesr');

var notificacionesrSchema =new SimpleSchema({
    
    idUs : {
        type : String
    },
    idRes: {
        type : String
    },
    idPre: {
        type : String,
        optional:true
    },
    idCur : {
        type : String
    },
    idDes : {
        type : String,
        optional:true
    },
    visto: {
        type : Boolean,         
    }
});
NOTIFICACIONESR.attachSchema(notificacionesrSchema);

PUNTUACION = new Mongo.Collection('puntuacion');
var puntuacionSchema =new SimpleSchema({
    
    idUs : {
        type : String
    },
    idObj: {
        type : String,        
    },
    puntos: {
        type : Number,         
    },
    idCur: {
        type : String,        
    }
});
PUNTUACION.attachSchema(puntuacionSchema);


