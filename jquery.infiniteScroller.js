/*
 *  Project: jQuery infiniteScroller
 *  Description: Simple plugin is an implemention of infinite scroll
 *  Author: Ivan Selchenkov
 *  Licence: You may use this script for free, but keep my credits.
 *  24th of December 2012
 */
;(function ( $, window, document, undefined ) {
    var infiniteScroller = "infiniteScroller",
        defaults = {
            ajax: {
                url: "",
                data: {

                }
            },  
            pageOffset: "page",
            onComplete: function() {},
            getPage: function() { return 1; },
            heightOffset: 10
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = infiniteScroller;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            this.bindEvent(this.element)
            this.request();
        },

        bindEvent: function(el, options) {
            $(el).on('scroll', $.proxy(this.onScroll, this));
        },

        onScroll: function(event) {
            var $el = $(this.element);

            mayLoadContent = $el.scrollTop() + this.options.heightOffset >= $el.prop("scrollHeight") - $el.height();

            if( mayLoadContent && !this.isLoading ) {
                this.request();
            }
        },

        request: function() {

            var _this = this;

            _this.isLoading = true;

            this.options.ajax.data[this.options.pageOffset] = this.options.getPage();

            $.ajax( this.options.ajax )
                 .success( this.options.onComplete )
                 .always( function() {
                    _this.isLoading = false;
                 } )
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.infiniteScroller = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_infiniteScroller")) {
                $.data(this, "plugin_infiniteScroller", new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );