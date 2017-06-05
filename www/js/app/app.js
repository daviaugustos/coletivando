var app = angular.module('coletivando', [
	'ionic', 
	'firebase', 
	'ionic.cloud', 
	'ngCordova', 
	'ngMask'
]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(false);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.constant('shopSettings', {
  payPalSandboxId : 'AY-pdA47XeOcmLjjkhSkciQmH0k-io8_Aq-_lOHzIYnG_xkZorvnrORLrcSuTkRAR_u-uXWpEcSDI5G7',
  //payPalProductionId : 'nosso production id',
  payPalEnv : 'PayPalEnvironmentSandbox',
  payPalShopName : 'ColetivandoShop',
});