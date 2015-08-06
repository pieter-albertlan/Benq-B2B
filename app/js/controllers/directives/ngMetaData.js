'use strict';

angular.module('app')
.directive('ngMetaData', [ "$window", "$rootScope", "$route", "LanguageHandler", "$http", function ( $window, $rootScope, $route, LanguageHandler, $http) {
	return function (scope, element) {

		var metadata;
		var metaDescription;
		var language;

		var init = function(){

			metaDescription = $("meta[name='description']");			
			setupEventListeners();				

		}

		var getJson = function(){

			 var json = 'json/metadata' + LanguageHandler.getLanguageExt() + '.json';
			 $http.get(json).success(function(data) {      	
			 	metadata = data;
			 	setParams();
			 });

		}

		var setupEventListeners = function(){

			$rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {			

				if (language != $rootScope.language){
					getJson();
				} else {
					setParams();
				}

		        language = $rootScope.language;

	    	});

	    	$rootScope.$on('languageChange', function() {
	    		getJson();
	    	});

		}

		var setParams = function(){


			if ((metadata) && ($route.current.state)) {

				var description = metadata[$route.current.state].description;
				var title = metadata[$route.current.state].title;
	            
	            document.title = title;
	            metaDescription.attr("content", description);   
	            
	            $rootScope.documentTitle = title;
	            $rootScope.metaDescription =  description;
	        }

		}

		init();
	}
}]);