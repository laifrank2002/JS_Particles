
function JS_image(x,y,src, width, height, id)
{
	this.x = x;
	this.y = y;
	
	this.image = new Image();
	this.image.onload = function(){};
	this.image.src = src;
	
	this.width = width;
	this.height = height;
	
	this.id = id;
	
	this.type = "JS_image";
}

JS_image.prototype.set_image = function(src)
{
	this.image = new Image();
	this.image.onload = this.onload;
	this.image.src = src;
}

JS_image.prototype.draw = function(context)
{
	// check if loaded first.
	if (this.image)
	{
		// try to render 
		try 
		{
			context.drawImage(this.image,this.x,this.y,this.width,this.height);
		}
		catch(exception)
		{
			Engine.log(exception);
		}
	}
}