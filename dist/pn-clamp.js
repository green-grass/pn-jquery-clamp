(function ($, window, document, undefined) {

    "use strict";

    var PLUGIN_NAME = "clamp";

    var methods = {

        clamp: function (options) {
            return _clamp(this, options);
        }
    };

    $.fn[PLUGIN_NAME] = function (method) {
        if (method === undefined) {
            method = "clamp";
        }
        
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.format.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery." + PLUGIN_NAME);
        }
    };

    function _clamp(elements, options) {
        options = $.extend({
            lines: 1
        }, options);

        elements.each(function (index, element) {
            clamp(element, options.lines);
        });

        return $.apply($, elements);

        function clamp(element, lines) {
            var $element = $(element),
                fullText = $element.data('full-text'),
                testText = '&nbsp;',
                lineHeight,
                pos;

            if (fullText === undefined) {
                fullText = $element.text();
                $element.data('full-text', fullText);
            }

            for (var i = 1; i < lines; i++) {
                testText += '<br/>&nbsp;';
            }

            $element.html(testText);
            lineHeight = $element.height();
            $element.html(fullText);

            if ($element.height() === lineHeight) {
                return;
            } else if ($element.height() < lineHeight) {
                while ($element.height() < lineHeight) {
                    $element.html($element.html() + '<br />&nbsp;')
                }
                return;
            }

            for (var i = 0; i < fullText.length; i++) {
                if (fullText[i] !== ' ') {
                    continue;
                }

                var trimedText = fullText.substring(0, i);
                $element.html(trimedText + '...');
                if ($element.height() > lineHeight) {
                    break;
                }

                pos = i;
            }

            if (pos === undefined) {
                $element.html('...');
            } else {
                $element.html(fullText.substring(0, pos) + '...');
            }
        }
    }

})(jQuery, window, document);
