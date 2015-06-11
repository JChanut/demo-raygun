// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  // Init Raygun.io
  console.log('Init Raygun error tracking');
  Raygun.init('ROnEUbhee/kOSGm3XLoFLg==').attach();
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($provide) {
     // Configure our exceptionhandler decorator
     $provide.decorator('$exceptionHandler', extendExceptionHandler)
})

.controller('HomeCtrl', function($scope) {
  console.log('Home Controller');
  $scope.exception1 = function() {
    console.log('Exception 1');
    throw new Error('Un exception lorsque je clique sur le bouton 1');
  }
  
  $scope.exception2 = function() {
    console.log('Exception 2');
    throw new Error('Un exception lorsque je clique sur le bouton 2');
  }
});

/**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} vmLogger
     * @return {Function} the decorated $exceptionHandler service
     */
    function extendExceptionHandler($delegate) {
        return function(exception, cause) {
            var errorData = {exception: exception, cause: cause};
            Raygun.send(exception);
            $delegate(exception, cause);
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
        };
    }