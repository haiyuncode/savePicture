'use strict';
/*global Camera, CameraPopoverOptions */
angular.module('main')
  .controller('PictureCtrl', function ($log, $scope, $q, pictureService, $cordovaCamera) {
    var vm = this;
    $log.log('Hello from your Controller: PictureCtrl in module main:. This is your controller:', this);

    pictureService.initDB();

    vm.getAllPictures = function () {
      pictureService.getReceiptFromDB().then(function (data) {
        alert('call back getReciptfrom db' + JSON.stringify(data));
        vm.pictureCollection = data;
      });
    };

    vm.takePicture = function () {
      var options = {
        quality: 40,
        destinationType: Camera.DestinationType.DATA_URL,
        //destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        //targetWidth: 800,
        //targetHeight: 1000,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {

        //vm.imgSrc = 'data:image/jpeg;base64,' + imageData;
        //pictureService.addReceipt($scope.receipt);
        pictureService.addReceipt({ name: 'Sleipnir', url: imageData});
      }, function (err) {
        alert('taking picture failed' + JSON.stringify(err));
      });
    };
  });
    //document.addEventListener('deviceready', function () {

    //vm.takePicture = function () {
    //  vm.log = 'take a picture';
    //  pictureService.takePicture().then(function (imageData) {
    //    //Display in the Url of the Original Picture
    //    vm.imgSrc = 'data:image/jpeg;base64,' + imageData;
    //
    //    //Add to the database
    //    //pictureService.addReceipt(vm.imgSrc);
    //  });
    //};
   //});


