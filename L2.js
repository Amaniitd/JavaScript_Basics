// Special type -> undefined
function f1(arg1) {
    // return nothing
}
var r = f1(10);
console.log(r); // undefined

// Overloading -> same function name but different parameters
function f2(arg1) {
    return arg1;
}
function f2(arg1, arg2) {
    return arg1 + arg2;
}
var r = f2(10, 20);
console.log(r); // 30
var r = f2(10);
console.log(r); // This will not work
// Only the last defined function will be executed
// This is because the javascript is an interpreted language
// It just overwrites the previous function

// One way is to define the function with maximum number of parameters
function f3(arg1, arg2, arg3) {
    if (arguments.length > 2) {
        return arg1 + arg2 + arg3;
    }
    if (arguments.length > 1) {
        return arg1 + arg2;
    }
    if (arguments.length > 0) {
        return arg1;
    }
    return 0;
}

console.log(".......Overloading.........");
console.log(f3(10, 20, 30)); // 60
console.log(f3(10, 20)); // 30
console.log(f3(10)); // 10
console.log(f3()); // 0

//  Polymorphism -> same function name but different parameters
// We can pass functions as parameters

function log() {
    console.log("log");
}
function trace() {
    console.log("trace");
}

function run(arg1, arg2, arg3) {
    var sum = arg1 + arg2;
    console.log(sum);
    arg3();
}

run(10, 20, log); // 30
run(10, 20, trace); // 30

// Async Operation
// Closure function 


function f4(arg1, arg2, arg3) {
    var localVar = 10;
    setTimeout(function () {   // closure function
        console.log(arg1 + arg2);
        arg3();
    }, 1000);
}
// Required data will not be garbage collected



//                                      Browser

//   UI Rendering Engine                JS Engine                   Browser API (NodeJS API)
//        DOM                Call Stack  | Task/Event Queue         setTimeout(cb, ms)
//                                                                  xhr
//                                                                  onclick(cb)

// For things like setTimeout, onclick.. -> we need to store the arguments


// Safegaurding the context

function Product(name, brand) {
    this.name = name;
    this.brand = brand;

    this.getInfo = function () {
        setTimeout(
        function getInfoFromServer() {
            this.data = [10, 20, 30]; // here this will not p1 | window.data = [10, 20, 30];
        }, 1000);
    }
}
// This will not output error but
// the problem is "this" pointer will changing the location

// How to fix this?
// store the location of the object in the variable "self"

function Product(name, brand) {
    this.name = name;
    this.brand = brand;
    this.getInfo = function () {
        var self = this; // we will store the location of the object in the variable "self"
        setTimeout(
            function getInfoFromServer() {
                self.data = [10, 20, 30]; // here this will be p1
            }, 1000);
    }
}

// This is called "safegaurding the context"

var p1 = new Product("Iphone", "Apple");
p1.getInfo();
// wait for 1000 msec before calling console log
console.log(p1.data); // undefined
setTimeout(function () {
    console.log(p1.data);
}, 1000);


// Second way:- Safegaurding the context using bind
// We will educate the function that it use the correct context
// We will use "bind" method

function Product(name, brand) {
    this.name = name;
    this.brand = brand;
    function getInfoFromServer() {
        this.data = [10, 20, 30];
    }
    this.getInfo = function () {
        setTimeout(getInfoFromServer.bind(this), 1000);
    }
}

// Not only "this" we can bind other and multiple arguments/variables

