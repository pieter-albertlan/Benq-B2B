PATH_JSON = "json"
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
          return ResolveHandler( { id: 'about', json: 'about' } )
        }]
      }
    })

    /*

    //Features

    /*.when('/:lang?/features/', {
      viewId:'features',
      templateUrl: 'views/features.html',
      controller: 'FeaturesCtrl'      
    })
    .when('/:lang?/features/eye-care/', {      
      viewId:'features-eye-care',
      templateUrl: 'views/features_eye_care.html',
      controller: 'FeaturesEyeCareCtrl'      
    })        
    .when('/:lang?/features/best-viewing/', {      
      viewId:'features-best-viewing',
      templateUrl: 'views/features_best_viewing.html',
      controller: 'FeaturesBestViewingCtrl'      
    })    
    .when('/:lang?/features/dual-ifp/', {      
      viewId:'features-dual-ifp',
      templateUrl: 'views/features_dual_ifp.html',
      controller: 'FeaturesDualIFPCtrl'      
    })
    .when('/:lang?/features/ease-of-use/', {      
      viewId:'features-ease-of-use',
      templateUrl: 'views/features_ease_of_use.html',
      controller: 'FeaturesEaseOfUse'      
    })
    .when('/:lang?/features/open-platform/', {      
      viewId:'features-open-platform',
      templateUrl: 'views/features_open_platform.html',
      controller: 'FeaturesOpenPlatform'      
    })
    .when('/:lang?/features/TCO-friendly/', {      
      viewId:'features-tco-friendly',
      templateUrl: 'views/features_tco_friendly.html',
      controller: 'FeaturesTCOFriendly'
    })

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
          return ResolveHandler( { id: 'home', json: 'home' } )
        }]
      }
    })


    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);    

  }]);
'use strict';

angular.module('app')
  .controller('HomeCtrl', ['$scope', "$rootScope", '$http', '$route', 'LanguageHandler', function ($scope, $rootScope, $http, $route, LanguageHandler) { 
   
  	 console.log("home start");

  }]);





'use strict';

angular.module('app')
  .controller('AboutCtrl', ['$scope', "$rootScope", '$http', '$route', 'LanguageHandler', function ($scope, $rootScope, $http, $route, LanguageHandler) { 
  
      console.log("about start");

  }]);







angular.module('app')
.service(
    "LanguageHandler", [ "$route", "$rootScope", "$location", function ($route, $rootScope, $location) {   
       
        var language = undefined;
        var langParam = undefined;

        var previousLangParam = undefined;

        var setParams = function(){     
            
            if ($route.current){
                langParam = $route.current.params.lang;   
            }

            if ((langParam == "cn") || (langParam == "tw") || (langParam == "zh-cht")){
                language = "chinese";
            } else if ((langParam == "uk") || (langParam == "us") || (langParam == "en")) {
                language = "english";
            } else{
                getSystemLanguage()
            }

            setLocationBase();           

        }    

        var setLocationBase = function(){

            var slashIndex = $location.$$url.substr(1).indexOf("/") + 1;
            var substr = $location.$$url.substr(slashIndex);

            $rootScope.locationBase = substr;
            $rootScope.language = langParam;
            $rootScope.cssLanguage = language;
            if (language == "english"){
                $rootScope.languagePrefix = "/";
            } else {
                $rootScope.languagePrefix = langParam + "/";
            }
            

        }  

        var getSystemLanguage = function(){

            //http://www.metamodpro.com/browser-language-codes

           /* var string = window.navigator.userLanguage || window.navigator.language;
            if (string.toLowerCase().indexOf("zh-tw") >= 0){
                language = "chinese";
                langParam = "tw";
            } else if ( string.toLowerCase().indexOf("zh-cn") >= 0){
                language = "chinese";
                langParam = "cn";
            }
            else {
                language = "english";
                langParam = "us";
            }*/

            language = "english";
            langParam = "us";

        }

      

        function LanguageHandler (){



        }

        
        LanguageHandler.setLanguage = function( string ){
            
            language = string;
            if (language == "chinese"){
                langParam = "zh-cht";
            } else {
                langParam = "us";
            }

            $rootScope.language = langParam;
            $rootScope.cssLanguage = language;
            $rootScope.$broadcast( 'languageChange' );

        }
        
        LanguageHandler.getLanguage = function(){

            return "";
            //return language;

        }

        LanguageHandler.getLanguageExt = function(){    

            switch (language){
                case "english":
                    return "";
                    break;
                case "chinese":
                    return "_CN";
                    break;

            }     

        }



       /* $rootScope.$on('$routeChangeStart', function() {             
            previousLangParam = $route.current.params.lang;
        });*/

        $rootScope.$on('$routeChangeSuccess', function() {                   
            setParams();
            setLocationBase();
        });
        
        setParams();
        
        

        return LanguageHandler;

    }]);











angular.module('app')
.service(
    "WidowFixer", [ "$route", "$rootScope", "LanguageHandler", function ($route, $rootScope, LanguageHandler) {   


        var stringKeys = ["txt", "intro"];
        var language = "english";


        function WidowFixer (){



        }

        WidowFixer.fix = function( object ){

            language = LanguageHandler.getLanguage();
            lookdeep(object);

            return object;

        }

        var lookdeep = function(object){

            var collection= [], index= 0, next, item;
            for(item in object){
                if(object.hasOwnProperty(item)){
                    next= object[item];
                    object[item] = analyse( object, item )
                    if(typeof next== 'object' && next!= null){
                        collection[index++]= item + ':{ '+ lookdeep(next).join(', ')+'}';
                    }
                    else collection[index++]= [item+':'+String(next)];
                }
            }
            return collection

        }

        var analyse = function( object, item ){

            var string = object[item];

            if (typeof string == 'string' || string instanceof String){
                for (var i = 0; i < stringKeys.length; i++) {
                    if (item == stringKeys[i]){
                        if (language == "english"){
                            string = string.replace(/\s(?=[^\s]*$)/g, "&nbsp;");   
                        } else {
                            //string = string.splice(string.length - 3, 0, "&nbsp;");
                        }
                        break;
                    }
                };
            }

            return string;

        }

        return WidowFixer;

    }]);



String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};






angular.module('app')
.service(
	"ResolveHandler", [ "$route", "$rootScope", "LanguageHandler", "$q", "$http", function ($route, $rootScope, LanguageHandler, $q, $http) {
		
		

		function ResolveHandler ( properties ){			
			
			var json = PATH_JSON + "/" + properties.json + LanguageHandler.getLanguageExt() + ".json";
    		$rootScope.cssId = properties.id;  	

    		return $q(function(resolve, reject) {

			  	$http.get(json).success(function(data) {      	

			      	//$rootScopedata = WidowFixer.fix(data);
			    	$rootScope.data = data;      
			    	console.log(data);
			    	resolve();
			    	
			    });

			 });
			

		}

		

		
		


		

		

		return ResolveHandler;

		


	}]);




