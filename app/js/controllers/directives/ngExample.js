'use strict';

angular.module('albertLanApp')
.directive('ngResize', [ "$window", function ($window) {
    return function (scope, element) {

        var w = angular.element($window);
        scope.mobileScreen = false;
        scope.ipad = false;
        scope.ie = false;
        scope.chrome = false;
        scope.safari = false;

        var init = function(){

            checkMobileScreen();
            checkIpad();
            checkIE();
            checkChrome();
            checkSafari();

        }

        scope.getWindowDimensions = function () {
            return {
                'h': w.outerHeight(),
                'w': w.outerWidth()
            };
        };
        
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {

            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;   
            scope.screenHeight =  screen.height;
            scope.screenWidth = screen.width;
            scope.innerWidth = window.innerWidth;
            if (!scope.innerHeight){
                scope.innerHeight = $("#body-bottom-sniffer", element).height();
            }

            TweenMax.killDelayedCallsTo( broadcast );
            TweenMax.delayedCall( 0.25, broadcast );

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {

            scope.$apply();

        });  

        var getIEVersion = function(){

            var ua = window.navigator.userAgent;

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
               // IE 12 => return version number
               return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        }    

        var checkIE = function(){

            scope.ie = getIEVersion();
            if (scope.ie){
                $("html").addClass("ie");
                $("html").addClass("ie"+scope.ie);
            }

        }

        var checkMobileScreen = function(){

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                scope.mobileScreen = true;
            }

        }

        var checkIpad = function(){

            if (navigator.userAgent.match(/iPad/i) != null){
                scope.ipadMode = true;
                $("html").addClass("ipad");
            }

        }

        var checkChrome = function(){

            var isChromium = window.chrome;
            var vendorName = window.navigator.vendor;

            if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc.") {
               scope.chrome = true;
               $("html").addClass("chrome");
            } 

        }

        var checkSafari = function(){

            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                scope.safari = true;
               $("html").addClass("safari");
            }

        }

        init();


        scope.$watch(
            function () { return $("#body-bottom-sniffer", element).height() },  
            function(newval, oldval){    
                scope.innerHeight = newval;
        }, true);

        scope.$watch(
            function () { return $(".view", element).height() },  
            function(newval, oldval){    
                scope.viewHeight = newval;
        }, true);

        $($window).on("orientationchange",function(){
            scope.innerHeight = undefined;
            scope.getWindowDimensions();
        });

        var broadcast = function(){
            scope.$broadcast('resize');
        }

        
        
    }
}]);