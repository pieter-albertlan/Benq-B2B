
angular.module('app')
.service(
	"ResolveHandler", [ "$route", "$rootScope", "LanguageHandler", "$q", "$http", function ($route, $rootScope, LanguageHandler, $q, $http) {

		function ResolveHandler ( properties ){			
			
			var json = PATH_JSON + "/" + properties.json + LanguageHandler.getLanguageExt() + ".json";
    		$rootScope.cssId = properties.css;  	

    		return $q(function(resolve, reject) {

			  	$http.get(json).success(function(data) {      	

			      	//$rootScopedata = WidowFixer.fix(data);
			      	$route.current.state = properties.json;
			    	$rootScope.data = data;  
			    	resolve();
			    	
			    });

			});		

		}

		return ResolveHandler;	

	}]);




