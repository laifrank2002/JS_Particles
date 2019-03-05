// a JS Page
function JS_page(draw,handle_mouse_up,handle_mouse_down)
{
	this.draw_script = draw;
	this.handle_mouse_up_sript = handle_mouse_up;
	this.handle_mouse_down_script = handle_mouse_down;
	
	this.children = [];
	
	this.buttons = [];
	this.labels = [];
	this.images = [];
}

JS_page.prototype.draw = function(context,lapse)
{
	for(child in this.children)
	{
		if(this.children[child].draw)
		{
			this.children[child].draw(context,lapse,0 ,0);
		}
	}
	if(this.draw_script) this.draw_script(context,lapse);
}

JS_page.prototype.handle_mouse_up = function(event)
{
	// we get internal canvas x and y
	// simplifies a lot of code.
	var bounds = Canvas.canvas.getBoundingClientRect();
	var mouseX = event.clientX - bounds.x;
	var mouseY = event.clientY - bounds.y;
	
	// propogating downwards.
	for(child in this.children)
	{
		if(this.children[child].handle_mouse_up)
		{
			this.children[child].handle_mouse_up(mouseX,mouseY);
		}
	}
	
	if(this.handle_mouse_up_script)this.handle_mouse_up_script(event);
}

JS_page.prototype.handle_mouse_down = function(event)
{
	// we get internal canvas x and y
	// simplifies a lot of code.
	var bounds = Canvas.canvas.getBoundingClientRect();
	var mouseX = event.clientX - bounds.x;
	var mouseY = event.clientY - bounds.y;
	
	// propogating downwards.
	for(child in this.children)
	{
		if(this.children[child].handle_mouse_down)
		{
			this.children[child].handle_mouse_down(mouseX,mouseY);
		}
	}
	
	// do the rest of the script 
	if(this.handle_mouse_down_script)this.handle_mouse_down_script(event);
}

JS_page.prototype.add_child = function(child)
{
	this.children.push(child);
}
// only works on the surface level 
JS_page.prototype.get_child_by_id = function(id)
{
	for (var child in this.children)
	{
		if (this.children[child].id === id) return this.children[child];
	}
}