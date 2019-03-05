
function JS_label(x,y,text, fontsize, textAlign, id)
{
	this.x = x;
	this.y = y;
	this.text = text;
	this.fontsize = fontsize || Canvas.DEFAULT_FONT_SIZE;
	this.align = textAlign || "center";
	this.id = id;
	
	this.type = "JS_label";
}

JS_label.prototype.draw = function(context, lapse, x, y)
{
	// change fontsize if it is different.
	context.font = this.fontsize + "px" + " " + Canvas.DEFAULT_FONT;
	context.beginPath();
	// measure text of current font then center text 
	var metrics = context.measureText(this.text);
	if(this.align ==="center")
	{
		context.fillText(this.text
			,this.x - metrics.width/2 + x
			,this.y + this.fontsize/2 + y); // height is from font.
	}
	else if (this.align === "left")
	{
		context.fillText(this.text
			,this.x + x
			,this.y + this.fontsize + y); // height is from font.
	}
	else 
	{
		this.align = "center"; // default
	}
	context.stroke();
	// reset font 
	context.font = Canvas.DEFAULT_FONT_SIZE + "px" + " " + Canvas.DEFAULT_FONT;
}
