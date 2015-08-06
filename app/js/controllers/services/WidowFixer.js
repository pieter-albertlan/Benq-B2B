

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




