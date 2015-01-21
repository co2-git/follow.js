follow.js
=========

	      >=>             >=>  >=>                                            
	    >>                >=>  >=>                                >=>         
	  >=>> >>    >=>      >=>  >=>    >=>     >=>      >=>             >===>  
	    >=>    >=>  >=>   >=>  >=>  >=>  >=>   >=>  >  >=>        >=> >=>     
	    >=>   >=>    >=>  >=>  >=> >=>    >=>  >=> >>  >=>        >=>   >==>  
	    >=>    >=>  >=>   >=>  >=>  >=>  >=>   >=>>  >=>=>        >=>     >=> 
	    >=>      >=>     >==> >==>    >=>     >==>    >==> >=>    >=> >=> >=> 
	                                                           >==>      

# Abstract

Enable events emitting to `Object.observe`. It ships whith a shim using `Object.defineProperty` of `Object.observe` not found. See limitations below.

# Install

```bash
bower install co2-git/follow.js
```

```html
<script src="bower_components/follow.js/dist/follow.js"></script>
<script>
	! function () {
		'use strict';

		var model = {
			counter: 0
		};

		new Follow(model)
			.on('update counter', function (counter, info) {
				console.info('counter updated', counter, info);
			});

		setInterval(function () {
			model.counter ++;
		}, 2000);

	} ();
</script>