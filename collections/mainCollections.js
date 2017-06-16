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
MATERIAL = new Mongo.Collection('material');

var materialSchema =new SimpleSchema({
    
    titulo : {
        type:String,
    },
    descripcion : {
        type : String
    }
});
MATERIAL.attachSchema(materialSchema);

CUESTIONARIOS = new Mongo.Collection('cuestionarios');

var cuestionariosSchema =new SimpleSchema({
    
    titulo : {
        type:String,
    },
    pregunta : {
        type : String
    },
    respuesta : {
        type : String
    },
    totalResp : {
        type : Number
    }
});
CUESTIONARIOS.attachSchema(cuestionariosSchema);