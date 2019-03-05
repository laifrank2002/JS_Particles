/** 
	Wrapper for canvas object. Does much of the animation.
	Some code taken from clocks-in-a-cooler.
	https://github.com/Clocks-in-a-Cooler
	@author Frank Lai 2002
	@version 2018-12-11
	https://github.com/laifrank2002
 */

var Canvas = (
	function()
	{
		// constants 
		var DEFAULT_CANVAS = "main_canvas";
		var DEFAULT_FONT_SIZE = 18;
		var DEFAULT_FONT = "Consolas";
		// private fields
		var canvas;
		var context;
		
		return {
			get canvas() {return canvas},
			get DEFAULT_FONT_SIZE() { return DEFAULT_FONT_SIZE },
			get DEFAULT_FONT() { return DEFAULT_FONT },
			initialize: function()
			{
				Engine.log("Initializing Canvas...");
				canvas = document.getElementById(DEFAULT_CANVAS);
				context = canvas.getContext("2d");
			},
			
			draw: function(lapse)
			{				
				//up to this point, nothing has been drawn yet!
				
				// clear and draw
				context.clearRect(0, 0, canvas.width, canvas.height);
				// reset font
				context.font = DEFAULT_FONT_SIZE + "px" + " " + DEFAULT_FONT;
				// leave everything to page_manager
				page_manager.current_page.draw(context, lapse);

			},

		}
	}
)();