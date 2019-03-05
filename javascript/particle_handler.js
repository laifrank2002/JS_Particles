var particle_handler = (
	function()
	{
		// global speed for debugging
		var global_speed = 1;
		
		var particles = [];
		var bounding_rectangle = {
			min_x: 0,
			min_y: 0,
			max_x: 800,
			max_y: 500,
		};
		return {
			get global_speed() {return global_speed},
			get bounding_rectangle() {return bounding_rectangle},
			get particles() {return particles},
			
			set_global_speed: function(speed)
			{
				global_speed = speed;
			},
			
			initialize: function()
			{
				particles.push(new Particle(50,15,"proton"));
				particles.push(new Particle(51,15,"proton"));
				particles.push(new Particle(52,15,"neutron"));
				particles.push(new Particle(53,15,"proton"));
				particles.push(new Particle(54,15,"neutron"));
				particles.push(new Particle(55,15,"proton"));
				particles.push(new Particle(56,15,"neutron"));
				particles.push(new Particle(57,15,"proton"));
				particles.push(new Particle(58,15,"proton"));
				particles.push(new Particle(59,15,"neutron"));
				particles.push(new Particle(60,15,"proton"));
				particles.push(new Particle(61,15,"neutron"));
				particles.push(new Particle(62,15,"proton"));
				particles.push(new Particle(63,15,"proton"));
				particles.push(new Particle(64,15,"neutron"));
				particles.push(new Particle(65,15,"neutron"));
				particles.push(new Particle(66,15,"proton"));
				particles.push(new Particle(67,15,"neutron"));
				particles.push(new Particle(68,15,"neutron"));
				particles.push(new Particle(69,15,"neutron"));
				particles.push(new Particle(70,15,"neutron"));
				particles.push(new Particle(160,20,"neutron"));
				particles.push(new Particle(550,420,"neutron"));
				particles.push(new Particle(750,220,"proton"));
			},
			
			draw: function(context)
			{
				for(var index = 0; index < particles.length; index++)
				{
					particles[index].draw(context);
				}
			},
			
			tick: function(lapse)
			{
				// tick all of them
				for(var index = 0; index < particles.length; index++)
				{
					particles[index].tick(lapse);
				}
				// set unique collision handshake algorithm
				for(var index = 0; index < particles.length; index++)
				{
					for (var new_index = index + 1; new_index < particles.length; new_index++)
					{
						if(particles[index].is_particle_in_bound(particles[new_index]))
						{
							particles[index].collide_with_particle(particles[new_index]);
						}
						// check strong 
						if(particles[index].is_particle_in_strong_radius(particles[new_index]))
						{
							particles[index].strong_radius_with_particle(particles[new_index]);
						}
						
					}
				} //
				
			},
		}
	}
)();