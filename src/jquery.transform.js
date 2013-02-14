(function ($) {
  'use strict';

  /*
   * Base function for all transformations
   */

  var base = function(property, transformer, params) {

    var value = $.map(params, function (item, index) {
      return transformer.call(this, item);
    }).join(", ");

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

  /*
   * Numeric to string conversion internal helper functions
   */

  function suffixNumber(param, suffix){
    if (typeof param === "number") {
      param += suffix;
    }        
    return param;
  }

  function toDeg(param){
    return suffixNumber(param, "deg");
  }

  function toPx(param){
    return suffixNumber(param, "px");
  }

  function toPc(param){
    return suffixNumber(param, "%");
  }

  function toStr(param){
    return suffixNumber(param, "");
  }

  /*
   * The plugin's outer world functions
   */

  var functionParamTypes = {
    number:toStr,
    length:toPx,
    angle:toDeg
  };

  var functionNames = [
    {
      "name":"matrix",
      "type":functionParamTypes.length
    },
    {
      "name":"translate",
      "type": functionParamTypes.length
    },
    {
      "name":"translateX",
      "type": functionParamTypes.length
    },
    {
      "name":"translateY",
      "type": functionParamTypes.length
    },
    {
      "name":"scale",
      "type": functionParamTypes.number
    },
    {
      "name":"scaleX",
      "type": functionParamTypes.number
    },
    {
      "name":"scaleY",
      "type": functionParamTypes.number
    },
    {
      "name":"rotate",
      "type": functionParamTypes.angle
    },
    {
      "name":"skew",
      "type": functionParamTypes.angle
    },
    {
      "name":"skewX",
      "type": functionParamTypes.angle
    },
    {
      "name":"skewY",
      "type": functionParamTypes.angle
    },
    {
      "name":"matrix3d",
      "type": functionParamTypes.length
    },
    {
      "name":"translate3d",
      "type": functionParamTypes.length
    },
    {
      "name":"translateZ",
      "type": functionParamTypes.length
    },
    {
      "name":"scale3d",
      "type": functionParamTypes.length
    },
    {
      "name":"scaleZ",
      "type": functionParamTypes.length
    },
    {
      "name":"rotate3d",
      "type": functionParamTypes.angle
    },
    {
      "name":"rotateX",
      "type": functionParamTypes.angle
    },
    {
      "name":"rotateY",
      "type": functionParamTypes.angle
    },
    {
      "name":"rotateZ",
      "type": functionParamTypes.angle
    },
    {
      "name":"perspective",
      "type": functionParamTypes.angle
    }
  ];

  $.each(functionNames,function(index, item){
    var name = item.name, type = item.type;
    $.fn[name] = function () {
      return base.call(this, name, type, arguments);
    };
  });
})(jQuery);