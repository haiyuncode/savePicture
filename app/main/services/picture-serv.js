/**
 * Created by Haiyun on 2/8/2016.
 */
'use strict';
/*global LokiCordovaFSAdapter, Camera, CameraPopoverOptions*/
angular.module('main')
  .service('pictureService', function ($log, $q, Loki, $cordovaCamera) {

    $log.log('Hello from your Service: pictureService in module main');
    var _db;
    var _receipts;

    function initDB () {
      var adapter = new LokiCordovaFSAdapter({'prefix': 'loki' });
      _db = new Loki('receiptsDB',
        {
          autosave: true,
          autosaveInterval: 5000, //1 second
          adapter: adapter
        });
      //alert('receiptDB created' + JSON.stringify(_db));
    }

    //function takePicture ()
    //{
    //  var options = {
    //    quality: 40,
    //    //destinationType : Camera.DestinationType.DATA_URL,
    //    destinationType: Camera.DestinationType.FILE_URI,
    //    sourceType: Camera.PictureSourceType.CAMERA,
    //    allowEdit: false,
    //    encodingType: Camera.EncodingType.JPEG,
    //    //targetWidth: 800,
    //    //targetHeight: 1000,
    //    popoverOptions: CameraPopoverOptions,
    //    saveToPhotoAlbum: true,
    //    correctOrientation: true
    //  };
    //
    //  var q = $q.defer();
    //
    //  $cordovaCamera.getPicture(options).then(function (imageData) {
    //    //return 'data:image/jpeg;base64,' + imageData;
    //    alert('camera called');
    //    q.resolve(imageData);
    //  }, function (err) {
    //    q.reject(err);
    //  });
    //
    //  return q.promise;
    //}

    function getReceiptFromDB ()
    {
      return $q(function (resolve, reject) {
        _db.loadDatabase('{}', function () {
          //retrieve data from notes collection
          alert('load receipts from db');
          _receipts = _db.getCollection('receipts');

          if (!_receipts) {
            //create notes collection
            alert('no receipts');
            _receipts = _db.addCollection('receipts');
          }
          alert('recipets data ' + JSON.stringify(_receipts.data));
          resolve(_receipts.data);
        });

      });
    }

    function addReceipt (receipt) {
      alert('addREceipt called' + JSON.stringify(receipt));
      _receipts.insert(receipt);
    }

    return {
      initDB: initDB,
      addReceipt: addReceipt,
      //akePicture: takePicture,
      getReceiptFromDB: getReceiptFromDB
    };

  });
