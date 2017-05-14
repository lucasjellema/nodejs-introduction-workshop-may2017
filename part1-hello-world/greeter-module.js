var greeter = module.exports;

// callback closures used with timeout
// invoke this program with: node hello-world-8.js name1 name2 name3

greeter.g = function (greetedPersoon) {
          console.log("Hello "+ greetedPersoon + "!");
          localPrivateFunction();
        }

greeter.getGreeter = function  ( greetee, greetFunction) {
  var toGreet = greetee;  
  console.log('I will greet '+ greetee + ' in a little while');
  // return the function (closure= function + local variable state) that timeout can later callback to
  return function () {  greetFunction(toGreet)};  // the reference to toGreet is established when the closure is created
}  

function localPrivateFunction() {
    // this function does nothing useful
    // it is not accessible outside this module
    console.log('localPrivateFunction: Only local calls are allowed.');
}