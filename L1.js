// Object base language: javascript (not object oriented)
// Object - oriented languages do not have the inbuilt objects
// whereas Object - based languages have the inbuilt objects


// dynamically typed language

var a = 10;
var b = "Hello";
var c = true;

console.log(".......function.........");
// function
function f1(arg1) {
    arg1 = arg1 + 10;
    console.log(arg1); // 20
}
console.log(".......Pass by value.........");
console.log(a);
f1(a);
console.log(a); 
// same output  -> pass by value -> value of "a" not get manupulated

// function - pass by reference
// Object literal notation
var obj = {
    a: 10
};

function f2(arg1) {
    arg1.a = arg1.a + 10;
    console.log(arg1.a); // 20
}
console.log(".......Pass by reference.........");
console.log(obj.a);
f2(obj);
console.log(obj.a);
// output get updated here -> pass by reference -> value of "obj.a" get manupulated

// All datatypes which are object type -> pass by reference
// All datatypes which are primitive type -> pass by value
// To use pass by reference -> use object literal notation -> var obj = {};
// To use pass by value in object -> use deep copy -> var obj = Object.assign({}, obj);

console.log(".......Deep Copy.........");
f2(Object.assign({}, obj)); // 30
console.log(obj.a); // 20


// Shallow cloning -> only copies the first level of the object
// Deep cloning -> copies the entire object
var obj2 = {
    a: 10,
    b: {
        name: "John"
    },
    c: [1, 2, 3]
};

function ShallowClone(obj) {
    var clone = {};
    for (var key in obj) {
        clone[key] = obj[key];
    }
    return clone;
}

function DeepClone(obj) {
    var clone = {};
    for (var key in obj) {
        if (typeof obj[key] === "object") {
            clone[key] = DeepClone(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }
    return clone;
}

// new keyword for creating new object -> using "constructor function" (earlier we used object literal notation)
var obj3 = new Object();
obj3.name = "John";
obj3.age = 30;

// both are same -> open for modification/extension

// "New" keyword is used to create new object -> it assign a new memory address to the object

// Custom Types
function Product(name, brand) {
    this.name = name;
    this.brand = brand;
}

var p1 = new Product("Iphone", "Apple");

// When we create a new object using "new" keyword -> it automatically creates a new memory address
// and assign it to the object -> it is called "object creation"
// the function is only assigning the properties to the object (not creating the object)
// "val pl =" is for storing the location of the object

// Parent of p1 -> Object
// p1 -> product.prototype -> Object.prototype -> null
// Object is not a class. It is a function which is used to create objects
// Object.prototype -> has properties and methods -> the actual class
// product.prototype -> class created automatically by js

console.log(".......Custom Types........."); 
var tool = this;

tool.a = 10;

console.log(tool.a);
console.log(this.a);
console.log(this);
console.log(p1);

// Creating function inside the function vs inside the class

// This will create the getInfo every time an object is created -> bad way
function Product(name, brand) {
    this.name = name;
    this.brand = brand;
    this.getInfo = function () {
        return this.name + " " + this.brand;
    }
}
// this will create the getInfo only once -> good way
function Product(name, brand) {
    this.name = name;
    this.brand = brand;
}
Product.prototype.getInfo = function () {
    return this.name + " " + this.brand;
}
// We are putting the function in the class itself -> good way

var p2 = new Product();
p2.name = "Iphone";
p2.brand = "Apple";
console.log(p2.getInfo());

// JS use prototypical inheritance not class inheritance
//  Prototypical inheritance is a runtime inheritance
//  Class inheritance is a compile time inheritance

// JS does not have private variables for objects

// For creating private variables -> use closures

function Product(name, brand) {
    this.name = name;
    this.brand = brand;
    var price = 100;
    this.getprice = function () {
        return price;
    }
}
// Now we can access the price using this.getprice() but we cannot change the price using this.price = 200;

p1.city = "Delhi";
delete p2.brand;
//  This is the benifit of javascript
//  We can add and delete properties of different objects of the same class

// We can also prevent extending of the class
Object.preventExtensions(p1); // p1 cannot be extended
Object.seal(p1); // p1 cannot be extended or deleted
Object.freeze(p1); // p1 cannot be extended, modified or deleted

// Object.seal makes the object like an object oriented class object

console.log(".......preventExtensions, seal, freeze.........");

if (Object.isExtensible(p1)) {
    console.log("Extensible");
} else {
    console.log("Not Extensible");
}
if (Object.isSealed(p1)) {
    console.log("Sealed");
} else {
    console.log("Not Sealed");
}
if (Object.isFrozen(p1)) {
    console.log("Frozen");
} else {
    console.log("Not Frozen");
}

if ("brand" in p1) {
    console.log("brand is in p1");
} else {
    console.log("brand is not in p1");
}
if ("city" in p1) {
    console.log("city is in p1");
} else {
    console.log("city is not in p1");
}
