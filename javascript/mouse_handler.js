var mouse_handler = (
	function()
	{		
		return {

			activate: function(element)
			{
				element.addEventListener("mousedown", Engine.handle_mouse_down, false);
				element.addEventListener("mouseup", Engine.handle_mouse_up, false);
				element.addEventListener("contextmenu", Engine.handle_context_menu, false);
			},
			
			deactivate: function(element)
			{
				element.removeEventListener("mousedown", Engine.handle_mouse_down, false);
				element.addEventListener("mouseup", Engine.handle_mouse_up, false);
				element.addEventListener("contextmenu", Engine.handle_context_menu, false);
			},
		}
	}
)();