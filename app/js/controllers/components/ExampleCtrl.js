'use strict';

angular.module('app')
.controller('FooterCtrl',  ['$scope', '$rootScope', '$http', '$element', '$rootElement', 'LanguageHandler', function ($scope, $rootScope, $http, $element, $rootElement, LanguageHandler) {

	var timeline = new TimelineMax({paused:true});	
	var waypoint_bottom = null;	
	var top;
	
	var title = $(".title", $element);
	var baseTop = $(".base-top", $element);
	var baseBottom = $(".base-bottom", $element);
	var phone = $(".desktop-info-wrapper .phone", $element); 
	var email = $(".desktop-info-wrapper .email", $element); 
	var dropdown = $(".dropdown-wrapper", $element);  
	var dummyBottom = $("#dummy-space-bottom", $rootElement);

	var sectionNext = $("section.next", $rootElement);
	var sectionNextShadow = $("section.next .shadow", $rootElement);
	var sectionNextShadowBottom = $("section.next .shadow.bottom", $rootElement);
	var sectionNextDarken = $("section.next .darken", $rootElement);

	var init = function(){
		
		
		setLanguage();
		setupEventListeners();
		
	}		

	var reset = function(){
		
		

	}	

	

	var setupEventListeners = function(){		

		if ((!$scope.mobileMode) && (!$scope.ipadMode) & (!$scope.ie)){	

			$scope.$watch('scrollY', function() {			
				onScroll();			
			});

		}

		
		
	}

	var onScroll = function(){				

		if (sectionNext.length == 0){
			sectionNext = $("section.next", $rootElement);					
		}

		if (sectionNextShadow.length == 0){
			sectionNextShadow = $("section.next .shadow", $rootElement);	
			sectionNextShadowBottom = $("section.next .shadow.bottom", $rootElement);		
			sectionNextDarken = $("section.next .darken", $rootElement);					
		}

		if (sectionNext.length != 0){	

			var sectionNextHeight = sectionNext.outerHeight();

			var yPos = (($scope.innerHeight + $scope.scrollY) - $scope.viewHeight);
			var alphaPos = 0;
			var alpha = 0;
			var darken = 0;

			if (yPos < -sectionNextHeight){
				yPos = -sectionNextHeight;
			} else if (yPos > 0){
				yPos = 0;
			}

			alphaPos = yPos;
			if (alphaPos < -100){
				alphaPos = -100;
			}

			alpha = alphaPos / -100;
			darken = (yPos + 100) / -sectionNextHeight;

			TweenMax.set( $element, { y:yPos } );	
			TweenMax.set( sectionNextShadowBottom, { y:yPos } );	
			TweenMax.set( sectionNextShadow, { alpha:alpha });
			TweenMax.set( sectionNextDarken, { alpha:darken });
			
			

		}

	}

	

	var hideElement = function(){

		$element.css("visibility", "hidden");

	}

	var showElement = function(){

		$element.css("visibility", "visible");

	}

	var checkPosition = function( top ){
		
		if (top > 0){
			showElement();
		} else {
			hideElement();
		}

	}

	var setLanguage = function(){		

		var json = 'json/common' + LanguageHandler.getLanguageExt() + '.json';

		$http.get(json).success(function(data) {      

	    	$scope.data = data;	
	    	
	    });

	}

	var refreshWaypoints = function(){

		Waypoint.refreshAll();	

	}

	$scope.$on('languageChange', function() {   
		
        setLanguage();

    });
	

	$scope.$on("resize", function() {
		


	});

	

	$scope.$watch("mobileMode", function() {

		if (!$scope.mobileMode){	
			
		} else {
			showElement();
		}

	});
	
	
	$scope.$watch(
        function () { return $element.offset().top },  
        function(newval, oldval){ 
        	refreshWaypoints();
    }, true);

    
	init();
	

}]);