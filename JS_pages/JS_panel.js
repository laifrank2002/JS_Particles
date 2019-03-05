// a JS panel
function JS_panel(x,y, width, height, id)
{
	this.x = x || 0;
	this.y = y || 0;
	
	this.width = width || 0;
	this.height = height || 0;
	
	this.id = id;
	
	this.children = [];
	
	this.type = "JS_panel";
}

JS_panel.prototype.draw = function(context, lapse)
{
	context.save();
	// clip to context 
	context.rect(this.x,this.y,this.width,this.height);
	context.clip();
	
	for (var child in this.children)
	{
		this.children[child].draw(context, lapse, this.x, this.y);
	}
	
	// after finishing rendering, restore.
	context.restore();
}

JS_panel.prototype.isInBound = function(x,y)
{
	if (x >= this.x 
		&& y > this.y 
		&& x <= this.x + this.width 
		&& y <= this.y + this.height)
	{
		return true;
	}
	return false;
}

JS_panel.prototype.handle_mouse_up = function(mouseX, mouseY)
{
	// only if it's inside!
	
	for(child in this.children)
	{
		if(this.children[child].handle_mouse_up)
		{
			this.children[child].handle_mouse_up(mouseX,mouseY);
		}
	}
}

JS_panel.prototype.handle_mouse_down = function(mouseX, mouseY)
{
	if(!this.isInBound(mouseX,mouseY))return;
	for(child in this.children)
	{
		if(this.children[child].handle_mouse_down)
		{
			this.children[child].handle_mouse_down(mouseX,mouseY); // handle displacement
		}
	}
}

JS_panel.prototype.add_child = function(child)
{
	child.clientX = child.x + this.x;
	child.clientY = child.y + this.y;
	this.children.push(child);
}
// only works on the surface level 
JS_panel.prototype.get_child_by_id = function(id)
{
	for (var child in this.children)
	{
		if (this.children[child].id === id) return this.children[child];
	}
}