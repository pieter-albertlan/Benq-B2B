PATH_JSON = "json";
PATH_CSS = "css";  

BREAK_SMALL = 750;
MAX_WIDTH = 1920;

angular
.module('app', [    
  "ngRoute"
  ])
.config(
  [ '$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    
    $routeProvider    

    //About

    .when('/:lang?/about', {    
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'about', json: 'about' } )
        }]
      }
    })    

    //Features

    .when('/:lang?/features/eye-care', {    
      templateUrl: 'views/features_eye_care.html',
      controller: 'FeaturesEyeCareCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'features-eye-care', json: 'features_eye_care' } )
        }]
      }  
    })        
    .when('/:lang?/features/best-viewing', {     
      templateUrl: 'views/features_best_viewing.html',
      controller: 'FeaturesBestViewingCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'features-best-viewing', json: 'features_best_viewing' } )
        }]
      }  
    })    
    .when('/:lang?/features/dual-ifp', {     
      templateUrl: 'views/features_dual_ifp.html',
      controller: 'FeaturesDualIFPCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'features-dual-ifp', json: 'features_dual_ifp' } )
        }]
      }  
    })
    .when('/:lang?/features/ease-of-use', {    
      templateUrl: 'views/features_ease_of_use.html',
      controller: 'FeaturesEaseOfUseCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'features-ease-of-use', json: 'features_ease_of_use' } )
        }]
      }  
    })
    .when('/:lang?/features/open-platform', {      
      templateUrl: 'views/features_open_platform.html',
      controller: 'FeaturesOpenPlatformCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'features-open-platform', json: 'features_open_platform' } )
        }]
      }     
    })
    .when('/:lang?/features/tco-friendly', {      
      templateUrl: 'views/features_tco_friendly.html',
      controller: 'FeaturesTCOFriendlyCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'features-tco-friendly', json: 'features_tco_friendly' } )
        }]
      }     
    })
    .when('/:lang?/features', {
      templateUrl: 'views/features.html',
      controller: 'FeaturesCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'features', json: 'features' } )
        }]
      }
    })

    /*

    //RP Series

    .when('/:lang?/rp-series/', {
      viewId:'rp-series',
      templateUrl: 'views/rp_series.html',
      controller: 'RPSeriesCtrl'
    })

    //Software

    .when('/:lang?/software/', {
      viewId:'software',
      templateUrl: 'views/software.html',
      controller: 'SoftwareCtrl'
    })

    //Succes Stories

    .when('/:lang?/succes-stories/', {
      viewId:'features',
      templateUrl: 'views/succes_stories.html',
      controller: 'SuccesStoriesCtrl'
    })

    //News

    .when('/:lang?/news/', {
      viewId:'news',
      templateUrl: 'views/news.html',
      controller: 'NewsCtrl'
    })

    //Support

    .when('/:lang?/support/', {
      viewId:'support',
      templateUrl: 'views/support.html',
      controller: 'SupportCtrl'
    })*/


    //Home

    .when('/:lang?', {   
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      resolve: {        
        handler: [ 'ResolveHandler', function(ResolveHandler){
          return ResolveHandler( { css: 'home', json: 'home' } )
        }]
      }
    })


    .otherwise({
      redirectTo: '/'
    });

    //$locationProvider.html5Mode(true);    

  }]);



angular.module('app').run(['$rootScope', function ($rootScope) {
    
  if ($("html").hasClass("hires")){
    $rootScope.highResPrefix = "-x2";
  }

}]);

