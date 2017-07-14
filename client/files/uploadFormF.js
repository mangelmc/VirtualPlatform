idFile = new ReactiveVar('none');
Template.uploadFormF.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadFormF.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  listGaleria: function(){
    var idMat = FlowRouter.getQueryParam('idMat');
    //console.log(CONTENT.find({idMat:idMat}).fetch());
    return CONTENT.find({idMat:idMat});
  },
  file: function(){
    //console.log(ARCHIVOS.findOne({_id:this.file}));
    return ARCHIVOS.findOne({_id:this.file});
  },
  galeria:function(){
    var idMat = FlowRouter.getQueryParam('idMat');
    var verif = CONTENT.find({idMat:idMat}).fetch();
    if (verif.length>0) {
      return true;
    }
    return false;
  },
});

Template.uploadFormF.events({
  
  'click .downloadall': function (e) {
    //e.preventDefault();
    //console.log(this);
    var conf  = confirm('¿ Esta seguro de descargar todos los archivos de este material ?');
    if (conf==true) {
      $('.download ').each(function() {
        //console.log(this);
        $(this).get(0).click();
      });
    }
    
  },
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = ARCHIVOS.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('error al subir la imagen: ' + error);
        } else {
          idFile.set(fileObj._id);
          var obj = {
            idUs : Meteor.userId(),
            idCur : FlowRouter.getQueryParam('cur'),
            idMat : FlowRouter.getQueryParam('idMat'),
            file : idFile.get()
          }
          Meteor.call('insertContent', obj);
          //console.log(idFile.get());
          alert('El archivo"' + fileObj.name + '" Se ha subido correctemente');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});