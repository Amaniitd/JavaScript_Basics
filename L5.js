// global scope
var num = 10;
console.log(num); // 10

// function scope
function f1() {
    var num = 20; // variable in lexical scope
    console.log(num); // 20
}
f1();
console.log(num); // 10
function f2() {
    var num = 20;
    console.log(num); // 20
    // Block scope
    for (var num = 0; num < 100; num++) { // num is now overwritten
    }
    console.log(num); // 100
}
f2();
console.log(num); // 10

// Let in ES6

function f3() {
    var num = 20;
    console.log(num); // 20
    // Block scope
    for (let num = 0; num < 100; num++) {

    }
}
// You can use let anywhere but try to only use it for block scope
// You can use let in loops



// Object desturcturing in ES6

var obj = {
    name: "John",
    age: 30,
    city: "New York",
    address: {
        city: "New York",
        state: "NY"
    }
};

var userAge = obj.age;

var useCity = obj.city;

// and so on

// Object desturcturing
var { age, city } = obj;
// provided the same name for the variables
// and the same name for the properties

// Alaising
var { name: userName, age: userAge } = obj;

var { address } = obj;
// This is shallow copy


// Array destructuring
var arr = [1, 2, 3, 4, 5];
var [a, b, c] = arr;
// a = 1, b = 2, c = 3


// Default values
function f4(a, b, c) {
    a = a || 1;
    b = b || 2;
    c = c || 3;
    console.log(a, b, c);
}
f4();
// 1 2 3

function Product (name = "", price = 0) {
    this.name = name;
    this.price = price;
}


var obj2 = {
    category: "RetailUser"
};
// Now I want to copy properties from obj to obj2

// Spread operator

var obj2 = {
    category: "RetailUser",
    ...obj
};
console.log(obj2);

// What if there is a property in obj2 that has the same name as a property in obj?
// Clash resolution
// The property in obj2 will be overwritten according to the order of the properties

// What if we dont want to overwrite the property in obj2?

var obj3 = {
    obj: { // object in object
        ...obj
    },
    category: "RetailUser"
};
console.log(obj3);
obj3.obj.address.city = "Delhi";
console.log(obj.address.city); // Delhi
// This means that spread operator do shallow copy




// Suppose there is an alien function (inside a library) and we pass a variable inside it.
// How to confirm if the variable is changed or not?
// For example we need to if something is changed or not for UI update

// One way: Dirty checking
// Keep a deep copy of the variable and compare it with the original variable

// Better way: -> Immutables
// We will demand the function to return a copy of the variable

function f1(arg) {
    var newArg = { ...arg };
    newArg.type = "BMW";
    return newArg;
} 

var vehicle = {
    number: "KA-01-HH-1234",
    type: "Audi",
    specs: {
        doors: 4
    }
};

var returnedVechile = f1(vehicle);
if (returnedVechile != vehicle) { // Imutables
    // changed
}
// Updates on values can be checked but what about the references?
// Yes, we will now that something is changed
// Because newArg is a new reference to the object
// Even if we don't change anything in newArg, it will still be a new reference




var data1 = [10, 20, 50, 30];
var data2 = [100, 600, 30];
var data3 = [...data1, ...data2]; // new Memory Allocation (Immutables)
console.log(data3);

// stack 
var vals = [10, 20, 30];
vals.push(40);
console.log(vals);


// queue
var vals = [10, 20, 30];
// vals.unshift(40);

function pushToFirst(val) {
    var data = [val, ...vals];
    return data;
}

var vals = pushToFirst(40);
console.log(vals);


// Rest operator
function f1 (a,b,...rest) {
    console.log(a,b,rest); //rest -> an array 
}
f1(1, 2, 3, 4, 5, 6, 7, 8, 9);


var date = new Date();
var text = "The time is " + date.toLocaleTimeString();

// Template literals
var text = `The time is ${date.toLocaleTimeString()}`;


// Via array join
var result = [
    "The time is ",
    date.toLocaleTimeString()
].join("");



// Classes in ES6

class Product
{
    constructor(name = "", price = 0) {
        this.name = name;
        this.price = price;
        this.getId = function () { // added to instance
            return this.id;
        }
    }
    getInfo() {
        // added to prototype
    }
}

var p1 = new Product("Apple", 100);
var p2 = new Product("Orange", 200);

// Is is just a syntactic sugar or a Object oriented classes like java?
// Just a syntactic sugar
// No change in fundamentals

