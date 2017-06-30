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
    puntos : {
        type : Number
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
    puntos : {
        type : Number
    }
    
});
RESPUESTAS.attachSchema(respuestasSchema);
