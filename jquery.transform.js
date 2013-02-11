(function ($) {
    var base = function (property, value) {
        return this.each(function () {
            var $this = $(this);
            var existingTransformation = $this.css("transform");
            if (existingTransformation === 'none') {
                existingTransformation = '';
            }
            if (existingTransformation !== '') {
                existingTransformation += ' ';
            }
            $this.css({
                transform: existingTransformation + property + "(" + value + ")"
            });
        });
    };
    
    var twoParams = function(property, param1, param2){
         if(typeof param2 === "undefined"){
            return base.call(this, property, param1);
        }
        return base.call(this, property, param1 + ', ' + param2);
    }
    
    $.fn.rotate = function (param) {
        if (typeof param === "number") {
            param += "deg";
        }
        return base.call(this, "rotate", param);
    };

    $.fn.scale = function (param) {
        return base.call(this, "scale", param);
    };

    $.fn.skew = function (param1, param2) {
       return twoParams.call(this,"skew", param1,param2);
    };

    $.fn.translateX = function (param) {
        return base.call(this, "translateX", param);
    };

})(jQuery);
