class Base{
    static info = "Base";
    constructor () {
        this.type = "Base User";
    }
    // toString() { //method hiding
    //     return "Hello I am a " + this.type;
    // }
}

class User extends Base {
    static info = "I am a User";
    constructor (name, age) {
        super(); // Base constructor
        // BaseConstructor.call(this); // Base constructor
        this.name = name;
        this.age = age;
    }
}

var u1 = new User("John", 30);
// Where will be the type?
console.log(u1.type); // Base User
// Exist in u1 itself

console.log(u1);
console.log(u1.toString());
// first it will check if toString is defined in the object
// if not it will check if it is defined in the prototype
// if not it will check if it is defined in the prototype of the prototype (parent of parent -> Base.prototype)
// And eventually Object prototype -> parent of Base.prototype


// Important advice:
// While creating multiple classes, always create a base class and inherit from it.
// This will help us to define the common properties and methods in the base class.


// Static methods
// Static methods are methods that are not associated with any instance of a class.
// They are called directly from the class itself.
console.log(User.info); // I am a User



// Array with event listeners

class ArrayList extends Array {
    constructor () {
        super();
        // Identifier 
        var arrayListId = Math.random(); // Private property
        this.getArrayListId = function () {
            return arrayListId;
        }

        this.info = function () {
            var temp = arrayListId // it is accessable  
        }

        var listeners = [];

        this.subscribe = function(cb) {
            listeners.push(cb);
        }

        this.notify = function(newValue) {
            listeners.forEach(function (cb) {
                cb(newValue);
            });
        }
    }
    push(value) { // Method hiding
        if (value) {
            super.push(value);
            this.notify(value);
        } else {
            throw new Error("Invalid arguments passed");
        }
    }
};

var a1 = new ArrayList();

a1.subscribe(function (value) {
    console.log("New value added " + value);
});

a1.push(1);
a1.push(2);
a1.push(3);


// Constants
const a = 10;

const b = {
    p1: 10,
    p2: "Hello"
};

b.p1 = 20;
console.log(b);
// Object got modefied even after using const keyword
// This is because of the fact that the object is a reference type.
// The value in b is a reference to the object. That will not change

