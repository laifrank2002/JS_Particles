// a JS panel
function JS_scroll_panel(x,y, width, height, id)
{
	// constants
	this.SCROLL_BAR_WIDTH = 10;
	
	this.x = x || 0;
	this.y = y || 0;
	
	this.width = width || 0;
	this.height = height || 0;
	
	// inner width 
	this.innerWidth = this.width;
	this.innerHeight = this.height;
	
	// real height, calculate true values later
	this.realWidth = this.width;;
	this.realHeight = this.height * 2; // TEST
	
	this.id = id;
	
	this.children = [];
	
	this.scroll_bar_x = false;
	this.scroll_bar_y = false;
	this.scroll_x = 0;
	this.scroll_y = 0;
	
	this.type = "JS_panel";
	
}

JS_scroll_panel.prototype.draw = function(context, lapse)
{
	context.save();
	// clip to context 
	context.beginPath();
	context.rect(this.x,this.y,this.width,this.height);
	context.clip();
	context.stroke();
	
	for (var child in this.children)
	{
		this.children[child].draw(context, lapse, this.x - this.scroll_x, this.y - this.scroll_y);
	}
	
	// after finishing rendering, restore.
	context.restore();
	
	// draw scrollbar 
	if(this.scroll_bar_y)
	{
		context.beginPath();
		context.rect(this.x + this.innerWidth
			,this.y
			,this.SCROLL_BAR_WIDTH
			,this.innerHeight);
		context.stroke();
		
		// draw the actual thingy 
		context.beginPath();
		context.rect(this.x + this.innerWidth
			,this.y + this.scroll_bar_y.scroll_bar_position
			,this.SCROLL_BAR_WIDTH
			,this.scroll_bar_y.scroll_bar_height);
		context.stroke();
	}
}

JS_scroll_panel.prototype.isInBound = function(x,y)
{
	if (x >= this.x 
		&& y > this.y 
		&& x <= this.x + this.innerWidth 
		&& y <= this.y + this.innerHeight)
	{
		return true;
	}
	return false;
}

JS_scroll_panel.prototype.handle_mouse_up = function(mouseX, mouseY)
{
	for(child in this.children)
	{
		if(this.children[child].handle_mouse_up)
		{
			this.children[child].handle_mouse_up(mouseX + this.scroll_x,mouseY + this.scroll_y);
		}
	}
}

JS_scroll_panel.prototype.handle_mouse_down = function(mouseX, mouseY)
{
	if(!this.isInBound(mouseX,mouseY))return;
	for(child in this.children)
	{
		if(this.children[child].handle_mouse_down)
		{
			this.children[child].handle_mouse_down(mouseX + this.scroll_x, mouseY + this.scroll_y);
		}
	}
}

JS_scroll_panel.prototype.add_child = function(child)
{
	child.clientX = child.x + this.x;
	child.clientY = child.y + this.y;
	this.children.push(child);
}
// only works on the surface level 
JS_scroll_panel.prototype.get_child_by_id = function(id)
{
	for (var child in this.children)
	{
		if (this.children[child].id === id) return this.children[child];
	}
}

// init scroll, TESTING 
JS_scroll_panel.prototype.initialize_scroll_y = function()
{
	this.innerWidth = this.width - this.SCROLL_BAR_WIDTH;
	this.scroll_bar_y = new JS_scroll_bar_y(this.innerHeight,this.realHeight);
}


// SCROLL BARS 
function JS_scroll_bar_y(height,total_height)
{	
	this.height = height;
	this.total_height = total_height;
	
	this.scroll_bar_position = 0;
	this.scroll_bar_height = (this.height/this.total_height * this.height);
}

JS_scroll_bar_y.prototype.isInBound(mouseX,mouseY)
{
	
}