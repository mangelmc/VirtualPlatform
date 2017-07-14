idImagen = new ReactiveVar('none');
Template.uploadFormI.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadFormI.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  currentImage : function(){
    if (idImagen.get() != 'none') {
      var image = IMAGES.findOne({_id:idImagen.get()});
      return image;
    }
    return false;
  },
  listGaleria: function(){
    return IMAGES.collection.find({userId:Meteor.userId()}).fetch();
  },
  itemImg: function(){
    //console.log(IMAGES.findOne({_id:this._id}));
    return IMAGES.findOne({_id:this._id});
  }
});

Template.uploadFormI.events({
  'click .vergaleria': function () {
    $('.galeria').slideToggle('fast');
  },
  'click .selimg': function (e) {
    idImagen.set(this._id);
  },
  'click .check': function (e) {
    //console.log(this);
    $('.check i').each(function(index, el) {
        $(this).text('highlight');
        $(this).parent().parent().addClass('lighten-3');
    });
    $('#'+this._id+'c i').text('check');
    $('#'+this._id+'c i').parent().parent().removeClass('lighten-3');
    idImagen.set(this._id);
    $('.galeria').slideUp('fast');

  },
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = IMAGES.insert({
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
          idImagen.set(fileObj._id);
          //console.log(idImagen);
          alert('La imagen "' + fileObj.name + '" Se ha subido correctemente');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});