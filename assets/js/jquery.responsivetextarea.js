// jQuery.responsivetextarea - 0.0.1
//
// Copyright 2012, Francesco Macri http://francescomacri.net
// Released under the WTFPL license 
// http://sam.zoy.org/wtfpl/
//
// This program is free software. It comes without any warranty, to
// the extent permitted by applicable law. You can redistribute it
// and/or modify it under the terms of the Do What The Fuck You Want
// To Public License, Version 2, as published by Sam Hocevar. See
// http://sam.zoy.org/wtfpl/COPYING for more details.
//
// Date: Mon Feb 18 00:45:00 2013 -0600
(function($) {
	var adjustSize = function(el, minrows) {
		var $this = $(el),
		    lines = $this.val().split("\n").length;

		if(!minrows || lines >= minrows) {
			$this.attr("rows", lines);		
		}
	},
	onKeyUp = function(e) {
		adjustSize(this, e.data.minrows);
	};

	$.fn.responsivetextarea = function(options) {
		var defaults = {
			minrows : 0
		},
		opts = $.extend({}, defaults, options);

		return this.each(function() {
			var $this = $(this);
			
			if($this.is("textarea")) {
				$this.css({
					"resize" : "none",
					"overflow" : "hidden",
					"height" : "auto",
					"min-height" : "",
					"max-height" : ""
				});

				$this.attr("rows", opts.minrows || parseInt($this.attr('rows')) || 0);
				
				$this.off("keyup", onKeyUp);
				$this.on("keyup", opts, onKeyUp);

				adjustSize(this, opts.minrows);
			}
		});
	};
})(jQuery);