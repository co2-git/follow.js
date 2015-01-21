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

Make `Object.observe` emit events. Ship whith a shim using `Object.defineProperty` if `Object.observe` not supported. See limitations below.

# Install

```bash
bower install co2-git/follow.js
```

# Usage

```html
<script src="follow.js"></script>
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
```

# Observe and emit

`Object.observe` is a nice way to keep track of an object change. Especially helpful in a realtime app, when model is bound to change a lot and view must react to these changes. I've just decided to mix `Object.observe` with Events Emitter using Browserify. It emits the same three events Object.observe listens to:

- add
- update
- delete

You can only follow objects. Everytime a change is observed on the followed object, an event is emitted by with the type of change and the name of the property.

```js
var model = {};

new Follow(model)
	
	.on('add name', function (name) {
		console.log('added name property', name);
	})

	.on('update name', function (name) {
		console.log('updated name property', name);
	})

	.on('delete name', function (name) {
		console.log('deleted name property', name);
	});

model.name = 'abc';

model.name = 'xyz';

delete model.name;
```

# Shim

`Object.observe` is not supported by all modern browsers (Firefox). In this case, a shim is supplied that uses `Object.defineProperty`

# Limitations

## Array

The `update` event will only pick up updates made directly to the array such as:

```js
// will emit "add array" [1]
model.array = [1];

// will emit "update array" [2]
model.array = [2];

// will not emit nothing
model.array[1] = 3;
model.array.push(4);
// and all other Array prototypes
