
function f1() {
    // Asynchronous code
    setTimeout(function () {
        console.log("f1");
    }, 1000);
}

function f2() {
    console.log("f2");
    f1();
    console.log("f2 after f1");
}
// f2();
// f2 -> f2 after f1 -> f1
// This is not the correct sequence

// How to do this just by using function


// Inversion of control (IOC) -> giving control back to the caller


function f1(cb) {
    setTimeout(function () {
        console.log("f1");
        cb(100);
    }, 1000);
}


function f2() {
    // Some data
    var dataPoints = [1, 2, 3, 4, 5];
    console.log("f2", dataPoints);
    function postF1() { // postF1 is a closure function -> data will be available for it
        // use of above data
        console.log("some more work in f2", dataPoints);
    }
    f1(postF1);
}
// f2();
// The dataPoints will be available for the postF1 function


// Since we dont have intrupts in javascript, we use callbacks to do this


// Another way:

function postF1(dataPoints, arg) {
    console.log("some more work in f2", dataPoints);
    console.log("arg: " + arg);
}

function f2() {
    // Some data
    var dataPoints = [1, 2, 3, 4, 5];
    console.log("f2", dataPoints);
    f1(postF1.bind(this, dataPoints));
}
// Inside the f1 function, we can also access the bind arguments with the "arguments" keyword

// f2();

// There is also some issues with binding and callbacks -> garbage collection
// The data will be available for the postF1 function -> may lead to memory leak





// An object with multiple constructors??

function BaseType(SerialNumber) {
    this.SerialNumber = SerialNumber;
}

function ElectronicType(chipset, modelNumber) {
    this.chipset = chipset;
    this.modelNumber = modelNumber;
}

function ConsumerGadget(screenDimension) {
    this.screenDimension = screenDimension;
} 

// One way is to create functions of all the combinations

// call and apply

var p1 = new BaseType("123");
ElectronicType.call(p1, "chipset", "modelNumber");
// we are invoking the constructor of ElectronicType and passing the arguments to it
// p1 is the object that we are creating -> already created in the constructor of BaseType
// p1.chipset = chipset;
// p1.modelNumber = modelNumber;

// console.log(p1);

// Class(constructer) of p1 is still BaseType but have the properties and methods of ElectronicType

// ..... This is called function borrowing .........

// console.log(p1.constructor); // -> BaseType


// Archive static functions


function Utils() {
    this.logger = function (content, type) {
        console.log("content: " + content + " type: " + type);
    }
}

// How to use some function defined in a class
// One way is to create an object(instance) of the class and then use the function
// This will take space in the memory

// How to do this without creating an object??

// We will use function borrowing

function run(a, b) {
    var result = a + b;
    var obj = {};
    Utils.call(obj);
    var logger = obj.logger; 
    logger(result, "sum");
}
// This solution (given in the lecture) is not optimal
// Sir may discuss this later
// On googling what I found:
// https://stackoverflow.com/questions/30421795/how-can-i-call-a-method-from-a-class-without-instantiating-it

// We are creating an object directly instead of creating a constructor
var Utils = {
    logger: function(content, type) {
        console.log("content: " + content + " type: " + type);
    }
}

function run(a, b) {
    var result = a + b;
    Utils.logger(result, "sum");
}

run(10, 20);

// In lecture: Using static functions in a class

function Utils() {
}

Utils.logger = function (content, type) {
    console.log("content: " + content + " type: " + type);
}
// Now the above function is static
function run(a, b) {
    var result = a + b;
    Utils.logger(result, "sum");
}

run(10, 20);
// This is correct

// Bindings and closures are good but sometimes it may be the reason for memory leak
// This is because the data will not be garbage collected if the function use that data


// Note: -> important

// Static:
// Static functions are not bound to the object but are bound to the class
// How to define:

// Utils.logger = function (content, type) {
//     console.log("content: " + content + " type: " + type);
// }

// Instance member but shared by all the objects of the class:
// How to define:
// Utils.prototype.logger = function (content, type) {
//     console.log("content: " + content + " type: " + type);
// }





// Financial orginization does not allow chrome extension in your browser
// Why?

// Question: How to change the behavior of console.log?

var originalLog = console.log;

console.log = function (content) {
    var dt = new Date().toLocaleTimeString();
    originalLog(dt, content);
}
console.log("hello world!");
// This concept is called Monkey patching

// Extension/patches can change the behavior of some functions
// Security issues


// Monkey patching usage example:

// Zone.js library in Angular
// Let us know about the events that are fired in the browser -> like key press, mouse click, mouse move, etc

// Quantum Matrix
// Fetches console.log events from the browser and send to the server
// good for debugging -> Proactive Issue Resolution
