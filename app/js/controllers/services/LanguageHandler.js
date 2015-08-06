

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








