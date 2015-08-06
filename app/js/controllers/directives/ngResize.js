'use strict';

angular.module('app')
.directive('ngResize', [ "$window", function ($window) {
    return function (scope, element) {

    	var _window = angular.element($window);
    	var bottomSniffer = $('<div class="height-sniffer">')

    	var init = function(){

    		$("html").append(bottomSniffer);
    		setupEventListeners();

    	}

    	var setupEventListeners = function(){

    		scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {

    		 	scope.windowHeight = newValue.h;
            	scope.windowWidth = newValue.w;   
            	scope.innerHeight = bottomSniffer.height();

            	var innerWidth = newValue.w;
            	if (innerWidth > MAX_WIDTH) { innerWidth = MAX_WIDTH }
            	scope.innerWidth = innerWidth;   

            	TweenMax.killDelayedCallsTo( broadcast );
            	TweenMax.delayedCall( 0.25, broadcast );

    		 }, true);

    		_window.on("orientationchange",function(){
	            scope.innerHeight = undefined;
	            scope.getWindowDimensions();
	        });

	        _window.bind('resize', function () {
	            scope.$apply();
	        });  

    	}



    	scope.getWindowDimensions = function () {
            return {
                'h': _window.outerHeight(),
                'w': _window.outerWidth()
            };
        };



        var broadcast = function(){
            scope.$broadcast('resize');
            console.log("width:" + scope.innerWidth + "  height:" + scope.innerHeight);
        }


    	init();

    }

}]);