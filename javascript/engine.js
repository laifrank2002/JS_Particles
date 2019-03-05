/** 
	Portable lightweight engine.
	
	REDO SELECT/DRAG'n'DROP!
		BUG- When click outside the canvas, make one click count.
	
	@author Frank Lai 2002
	@version 2018-12-11
	https://github.com/laifrank2002
 */

// animation constants 
 
var Engine = (
	function()
	{	
		// debugging
		var _log = true;
		var _debug = true;
		
		var objects = [];
		
		//sets keys pressed 
		var keys_pressed = [];
		
		//stores cursor's position from the top left corner; x corresponds to left-right; y corresponds to up-down
		var cursor = {
			x: 0,
			y: 0,
		};
		
		//for animation
		var last_time = null; 
		var lapse = 0;
		var paused = false;
		
		var frame_count = 0;
		
		var viewport = {
			x: 0,
			y: 0,
			width: 600,
			height: 500,
		};		
		// game variables 
		var puzzles = {};
		return {
			get cursor() { return cursor },
			get cursor_x() { return cursor.x },
			get cursor_y() { return cursor.y },
			
			get viewport() { return viewport },
			get puzzles() { return puzzles },
			initialize: function()
			{
				Engine.log("Initializing Engine...");
				Canvas.initialize();
				page_manager.initialize();
				
				mouse_handler.activate(Canvas.canvas);
				
				document.onmousemove = function(event) {
					
					var bounds = Canvas.canvas.getBoundingClientRect();
					// get internal x and y; we don't care about x and y outside the bounds!
					cursor.x = event.pageX - bounds.x;
					cursor.y = event.pageY - bounds.y;
				}
				
				particle_handler.initialize();
				
				requestAnimationFrame(Engine.animate); // init animation when all is ready
			},
			
			log: function(message)
			{
				if (_log)
				{
					console.log(message);
				}
			},
			
			debug: function()
			{
				setInterval(function()
				{
					Engine.log(frame_count);
					frame_count = 0;
				}, 1000);
			},
			
			toggle_pause: function()
			{
				paused = !paused;
			},
			
			// animation
			animate: function(time)
			{
				if (last_time === null)
				{
					lapse = 0;
				}
				else 
				{
					lapse = time - last_time;
				}
				
				last_time = time;
				
				if(!paused) 
				{
					Engine.draw_frame(lapse);
				}
				
				if (_debug) frame_count++; // debugging
				requestAnimationFrame(Engine.animate);
			},
			
			draw_frame: function(lapse)
			{
				// call canvas handler
				Canvas.draw(lapse);
			},
			// special exception
			handle_context_menu: function(event)
			{
				if(page_manager.current_page.handle_context_menu)
				{
					event.preventDefault();
					page_manager.current_page.handle_context_menu(event);
				}
			},
			
			handle_mouse_up: function(event)
			{
				// only respond for left mouse 
				if (event.button === 0) page_manager.current_page.handle_mouse_up(event);
			},
			// only click UI once, but click puzzle_handler twice
			handle_mouse_down: function(event)
			{
				// only respond for left mouse 
				if (event.button === 0) page_manager.current_page.handle_mouse_down(event);
			},
		}
	}
)();
