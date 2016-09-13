// A Promise filler library
(function () {
  function Promise(fn) {
    var context = this;
    var count = 0;
    var fns = [];
    this.state = 'PENDING';
    this.value = [];

    if (!fn.constructor === Array) {
      fns.push(fn);
    } else {
      fns = fn;
    }
    try {
      fns.forEach(function(fn, index) {
         fn(function(value) {
          if(context.state == 'RESOLVED') {
            return;
          }
          count++;
          context.value[index] = value;
          if (count === fns.length) {
            context.state = 'RESOLVED';
          }
        }, function(error) {
          context.state = 'ERROR'; 
          context.value = error;
        });
      });
    }
    catch(exception) {
      context.state = 'ERROR';
      context.value = exception;
    }
  }

  Promise.prototype.then = function(resolve, reject) {
    var context = this,
      interval = setInterval(function() {
        if(context.state === 'RESOLVED') {
          clearInterval(interval);
          resolve(context.value);
        }
        else if(context.state === 'ERROR') {
          clearInterval(interval);
          reject(context.value);
        }
      }, 0);
  }

  if (window.Promise) {
    return;
  }
  window.Promise = Promise;
})(window);
