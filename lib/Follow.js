/***


      >=>             >=>  >=>                                            
    >>                >=>  >=>                                >=>         
  >=>> >>    >=>      >=>  >=>    >=>     >=>      >=>             >===>  
    >=>    >=>  >=>   >=>  >=>  >=>  >=>   >=>  >  >=>        >=> >=>     
    >=>   >=>    >=>  >=>  >=> >=>    >=>  >=> >>  >=>        >=>   >==>  
    >=>    >=>  >=>   >=>  >=>  >=>  >=>   >=>>  >=>=>        >=>     >=> 
    >=>      >=>     >==> >==>    >=>     >==>    >==> >=>    >=> >=> >=> 
                                                           >==>      



  @repository https://github.com/co2-git/followjs
  @author https://github.com/co2-git

***/

; ! function () {

  'use strict';

  /**
   */

  function Follow (object) {

    this.object = object;

    var self = this;
      
    setTimeout(function () {
      console.log(self.object)
    }, 1500);

    this.followed = function () {
      return object;
    };

    this.observer = !! Object.observe;

    this.placeholders = {};
    this.values = {};
    this.types = {};

    this.on('newListener', function (event, listener) {
      if ( ! self.observer ) {
        var split_event = event.split(/\s/);
        var action = split_event[0];
        var prop = split_event[1];


        if ( action === "add" ) {

          if ( prop in self.object === false ) {
            self.placeholders[prop] = true;

            Object.defineProperty(self.object, prop, {
              set: function (value) {
                console.warn('this', this)
                if ( self.placeholders[prop] ) {
                  delete self.placeholders[prop];
                  self.emit(event, value);
                  console.warn('add', prop, value);

                  if ( Array.isArray(self.object[prop]) ) {
                    
                  }
                }
                else {
                  console.warn('update', prop, value, this.value);
                  self.emit(event.replace(/^add/, 'update'), value, {
                    old: self.values[prop]
                  });
                }
                self.values[prop] = value;
              },

              get: function () {
                return self.values[prop];
              }
            });
          }
        }

        if ( action === 'update' ) {

          if ( prop in self.object ) {
            if ( self.placeholders[prop] ) {
            }
          }

          else {
            console.warn('hello!');
            Object.defineProperty(self.object, prop, {
              set: function (value) {
                self.emit(event, value);
                console.warn('update', prop, value);
              }
            });
          }

        }

      }
    })

    this.follower();
  }

  /**
   */

  function Follow_Shim (object) {

  }

  /**
   */

  require('util').inherits(Follow, require('events').EventEmitter);

  /**
   */

  Follow.prototype.follower = function () {

    var self = this;

    for ( var prop in this.object ) {
      self[prop] = this.object[prop];
    }

    if ( this.observer ) { 
      
      Object.observe(self.object, function (changes) {
        
        changes.forEach(function (change) {
          
          var event = change.type + ' ' + change.name;
          
          var message = {
            name: change.name,
            new: change.object[change.name],
            old: change.oldValue,
            event: change.type
          };

          self.emit(event, message.new, message);
        
        });
      });
    }

    else {

      this.object;

    }
  }

  var on = Follow.prototype.on;



  Follow.prototype.on.add = function (prop, then) {
    console.log('hello', this.object);

    if ( this.observer ) {
      return this.on('add ' + prop, then);
    }

    var self = this;

    Object.defineProperty(this.object, prop, {
      set: function (value) {
        console.log(value, value, value);
      }
    });
  };

  Follow.prototype.on.add = Follow.prototype.on.add.bind(Follow.prototype);


  if ( module && module.exports ) {
    module.exports = Follow;
  }

  if ( this ) {
    this.Follow = Follow;
  }

  if ( window ) {
    window.Follow = Follow;
  }

  return Follow;

}();
