function Particle(x,y, type)
{
	this.x = x;
	this.y = y;
	this.type = type;
	
	this.velocity = {x: 100, y: 100};
	this.acceleration = {x: 0, y: 0};
	
	if (particle_types[this.type])
	{
		this.colour = particle_types[this.type].colour; 
		this.radius = particle_types[this.type].radius; 
		this.strong_radius = particle_types[this.type].strong_radius; 
		this.electrostatic = particle_types[this.type].electrostatic; 
		this.mass = particle_types[this.type].mass; 
	}
}

Particle.prototype.draw = function(context)
{
	// draw main
	context.globalAlpha = 1;
	context.setLineDash([])
	context.fillStyle = this.colour;
	context.beginPath();
	context.arc(this.x,this.y,this.radius, 0, 2 * Math.PI);
	context.fill();
	context.stroke();
	
	// draw strong radius 
	context.globalAlpha = 0.1;
	context.beginPath();
	context.setLineDash([4, 2]);
	context.arc(this.x,this.y,this.strong_radius, 0, 2 * Math.PI);
	context.fill();
	context.stroke();
}

Particle.prototype.tick = function(lapse)
{
	this.x += this.velocity.x * lapse * particle_handler.global_speed / 1000;
	this.y += this.velocity.y * lapse * particle_handler.global_speed / 1000;
	
	this.bounce();
	this.restitute();
}

Particle.prototype.move = function(delta_x, delta_y)
{
	this.x += delta_x;
	this.y += delta_y;
}

// takes a force in N and changes velocity accordingly
Particle.prototype.act_force = function(theta, force)
{
	this.velocity.x += force * Math.cos(theta) / this.mass;
	this.velocity.y += force * Math.sin(theta) / this.mass;
}

Particle.prototype.move_polar = function(theta, magnitude)
{
	this.x += magnitude * Math.cos(theta);
	this.y += magnitude * Math.sin(theta);
}

Particle.prototype.collide_with_particle = function(particle)
{
	var delta_x = particle.x - this.x;
	var delta_y = particle.y - this.y;
	// move one half the distance for each on th' opposite direction
	
	var magnitude = (this.radius + particle.radius) - (Math.sqrt(delta_x * delta_x + delta_y * delta_y));	
	var theta = this.get_theta_from_line(this.x,this.y,particle.x,particle.y);
	particle.move_polar(theta, magnitude/2);
	this.move_polar(theta + Math.PI, magnitude/2);
	
	// change velocity to compensate too 
	particle.act_force(theta, magnitude/2);
	this.act_force(theta + Math.PI, magnitude/2);
	
}

Particle.prototype.strong_radius_with_particle = function(particle)
{
	var delta_x = particle.x - this.x;
	var delta_y = particle.y - this.y;
	// move one half the distance for each on th' same direction
	
	var magnitude = (Math.sqrt(delta_x * delta_x + delta_y * delta_y));	
	var theta = this.get_theta_from_line(this.x,this.y,particle.x,particle.y);
	
	particle.move_polar(theta + Math.PI, (magnitude - this.radius - particle.radius)/2);
	this.move_polar(theta, (magnitude - this.radius - particle.radius)/2);
	
	/*
	// change velocity of the other, over r^2
	particle.act_force(theta + Math.PI, 100/magnitude);
	this.act_force(theta, 100/magnitude);
	*/
}

Particle.prototype.get_polar_velocity = function()
{
	var theta = this.get_theta_from_line(0,0,this.velocity.x,this.velocity.y);
	var magnitude = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y + this.velocity.y);
	return {"magnitude": magnitude, "theta": theta};
}

Particle.prototype.get_theta_from_line = function(x1,y1,x2,y2)
{
	var delta_x = x2 - x1;
	var delta_y = y2 - y1;
	// prevent divide by zero bugs (if two particles occupy the same pixel
	// we can theoretically return any value since magnitude would be 0 anyways
	if (delta_x === 0) return 0;
	
	var theta = Math.atan((delta_y)/(delta_x));
	
	if (delta_x < 0) theta += Math.PI;
	if (delta_x > 0 && delta_y < 0) theta += 2 * Math.PI;
	return theta;
}

Particle.prototype.is_particle_in_bound = function(particle)
{
	if (Math.sqrt(Math.pow((particle.x - this.x),2) + Math.pow((particle.y - this.y),2)) < this.radius + particle.radius)
	{	
		return true;
	}
}

Particle.prototype.is_particle_in_strong_radius = function(particle)
{
	if (Math.sqrt(Math.pow((particle.x - this.x),2) + Math.pow((particle.y - this.y),2)) < this.strong_radius)
	{	
		return true;
	}
}

Particle.prototype.bounce = function()
{
	if(this.x - this.radius < particle_handler.bounding_rectangle.min_x
		|| this.x + this.radius > particle_handler.bounding_rectangle.max_x) 
	{
			this.velocity.x = -this.velocity.x;
	}
	if(this.y - this.radius < particle_handler.bounding_rectangle.min_y
		|| this.y + this.radius > particle_handler.bounding_rectangle.max_y) 
	{
		this.velocity.y = -this.velocity.y;
	}
}

Particle.prototype.restitute = function()
{
	if(this.x - this.radius < particle_handler.bounding_rectangle.min_x) this.x = particle_handler.bounding_rectangle.min_x + this.radius;
	if(this.y - this.radius < particle_handler.bounding_rectangle.min_y) this.y = particle_handler.bounding_rectangle.min_y + this.radius;
	if(this.x + this.radius > particle_handler.bounding_rectangle.max_x) this.x = particle_handler.bounding_rectangle.max_x - this.radius;
	if(this.y + this.radius > particle_handler.bounding_rectangle.max_y) this.y = particle_handler.bounding_rectangle.max_y - this.radius;
}

var particle_types = {
	"proton": {
		colour: "red",
		radius: 20,
		strong_radius: 60,
		electrostatic: "positive",
		mass: 1.007276,
	},
	"neutron": {
		colour: "yellow",
		radius: 21,
		strong_radius: 60,
		electrostatic: "neutral",
		mass: 1.008665,
	},
}