# promise-filler
ES6 promise polyfill.

## Install
```javascript
bower install promise-filler
```

### Usage - Single
```javascript
var p1 = new Promise(function(resolve, reject) {
  resolve("Success!");
  // or
  // reject ("Error!");
});

p1.then(function(value) {
  console.log(value[0]); // Success!
}, function(reason) {
  console.log(reason); // Error!
});
```

### Usage - Multiple
```javascript
function isEven(arr) {
  return new Promise([function(res, rej) {
    setTimeout(function() {
      var n = arr[0];
        if(n%2 === 0) {
          res(n);
        } else {
          rej(arr);
        }
     }, 3000);
  }, function(res, rej) {
    setTimeout(function() {
      var n = arr[1];
      if(n%2 === 0) {
        res(n);
      } else {
        rej(n);
      }
    }, 5000);
  }]);
}

function resolve(n) {
  console.log('even: ', n);
}

function reject(n) {
  console.log('odd rejected');
}

isEven([1,2]).then(resolve, reject);

```
