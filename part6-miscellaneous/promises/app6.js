var async = require('async')


var delay = 1500;  //miliseconds

var numberOfLoops = 5;
var results = Array(numberOfLoops);

function doStuff(param, callback) {
    var cb = callback;
    var p = param;
    setTimeout(function () {
        console.log("Stuff was done for parameter " + param);
        cb(param.toUpperCase());
    }, delay * (0.7 + Math.random()));
}

function reportExecutionTime() {
    var end = new Date() - start;
    console.info("Execution time: %dms", end);
    console.info("Results: " + JSON.stringify(results));
}

var start = new Date();

// sequential loop resulting in parallel execution
// note how the overall execution time (over all executions) is reported for each individual execution. Also note how the first execution going in may not be the first to be completed
// note2 - check out that the result from each step does not end up in the correct location in the array

// use asynch to reorganize the code
var steps = Array(numberOfLoops).fill().map((_, i) => i);

async.forEachOf(steps, function (value, key, callback) {
    doStuff('Step ' + value, function (parameter) {
        console.log("Report back from doStuff for parameter " + parameter);
        results[value] = parameter;
        callback()
    })}, function (err) { // completion of the forEachOf
        // results should now be completed
        reportExecutionTime();
    }
    );// forEachOf	

    console.log("Main loop is done.");