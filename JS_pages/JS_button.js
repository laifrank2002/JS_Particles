function JS_button(x,y,width,height, text, onclick)
{
	this.x = x;
	this.y = y;
	
	this.clientX = x;
	this.clientY = y;
	
	this.width = width;
	this.height = height;
	this.text = text;
	this.onclick = onclick;
	
	this.type = "JS_button";
	
	// clicking for buttons! now we don't have to just pretend mouse down is clicking!
	this.mouse_downed = false;
}

JS_button.prototype.draw = function(context, lapse, x, y)
{
	context.beginPath();
	context.rect(this.x + x,this.y + y,this.width,this.height);
	// measure text of current font then center text 
	var metrics = context.measureText(this.text);
	// measure the height of the font from the font.
	
	context.fillText(this.text
		,this.x + this.width/2 - metrics.width/2 + x
		,this.y + this.height/2 + Canvas.DEFAULT_FONT_SIZE/2 + y);
	context.stroke();
}

JS_button.prototype.isInBound = function(x,y)
{
	if (x >= this.clientX 
		&& y > this.clientY 
		&& x <= this.clientX + this.width 
		&& y <= this.clientY + this.height)
	{
		return true;
	}
	return false;
}

JS_button.prototype.handle_mouse_down = function(mouseX, mouseY)
{
	if(this.isInBound(mouseX,mouseY))this.mouse_downed = true;
}

JS_button.prototype.handle_mouse_up = function(mouseX, mouseY)
{
	if(this.isInBound(mouseX,mouseY) && this.mouse_downed)
	{
		this.onclick(mouseX,mouseY);
	}
	this.mouse_downed = false;
}