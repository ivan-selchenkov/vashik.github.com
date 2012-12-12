/*
**	Anderson Ferminiano
**	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
**	jQuery ScrollPagination
**	28th/March/2011
**	http://andersonferminiano.com/jqueryscrollpagination/
**	You may use this script for free, but keep my credits.
**	Thank you.
*/

/*!
 * Fix&Features
 * Version v0.1
 * https://github.com/vashik/jquery-scroll-pagination
 *
 * Copyright (c) 2012 Ivan Selchenkov
 * Released under the MIT, BSD, and GPL Licenses.
 */


(function( $ ){
	 
		 
 $.fn.scrollPagination = function(options) {
  	
		var opts = $.extend($.fn.scrollPagination.defaults, options);  
		var target = opts.scrollTarget;
		if (target == null){
			target = obj; 
	 	}
		opts.scrollTarget = target;
	 
		return this.each(function() {
		  $.fn.scrollPagination.init($(this), opts);
		});

  };
  
  $.fn.stopScrollPagination = function(){
	  return this.each(function() {
	 	$(this).attr('scrollPagination', 'disabled');
	  });
	  
  };
  
  $.fn.scrollPagination.loadContent = function(obj, opts){
	 var target = opts.scrollTarget;
	 var mayLoadContent = $(target).scrollTop()+opts.heightOffset >= $(opts.contentTarget).height() - $(target).height();
	 if (mayLoadContent){
		 if (opts.beforeLoad != null){
			opts.beforeLoad(); 
		 }
		 $(obj).children().attr('rel', 'loaded');
		 $.ajax({
              type: opts.type,
			  url: opts.url,
			  data: opts.contentData,
              dataType: opts.dataType
		 })
		 .success(function(response) {
		 	opts.contentTarget.append(opts.render(response))
		 })
         .success(function() {
         	if( opts.offset ) {
            	opts.contentData[opts.offset] += opts.getNumberElements()
            }
         });
	 }
	 
  };
  
  $.fn.scrollPagination.init = function(obj, opts){
	 var target = opts.scrollTarget;
	 $(obj).attr('scrollPagination', 'enabled');
	
	 $(target).scroll(function(event){
		if ($(obj).attr('scrollPagination') == 'enabled'){
	 		$.fn.scrollPagination.loadContent(obj, opts);		
		}
		else {
			event.stopPropagation();	
		}
	 });
	 
	if( opts.offset && !opts.contentData[opts.offset] ) {
		opts.contentData[opts.offset] = 0;
	};

	 $.fn.scrollPagination.loadContent(obj, opts);
	 
 };
	
	$.fn.scrollPagination.defaults = {
		url : null,
		contentData : {},
		beforeLoad: null,
		afterLoad: null	,
		scrollTarget: null,
		heightOffset: 0,
		type: 'GET',
		dataType: "jsonp",
		render: null		
	};	
})( jQuery );