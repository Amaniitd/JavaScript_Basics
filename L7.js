
class User{
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        // simulating Async server call
        setTimeout(function () {
            this.details = [10, 20, 30]; //but "this" will loose its context
        }, 2000);
    }
}
// We already saw two ways of handling this situation.
// 1. Closure for saving context -> var self = this;
// 2. Using bind() method

// Fat arrow function -> anonymous function

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        // simulating Async server call
        setTimeout(() => {
            this.details = [10, 20, 30]; // javascript will bind the "this" to the fat arrow function
        }, 2000);
    }
}
// Dont spam the fat arrow function -> it store the context
// backtracking and debugging is hard
// We can provide name by this way:

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        var getDetailsTimeout = () => {
            this.details = [10, 20, 30];
        }
        setTimeout(getDetailsTimeout, 2000);
    }
}


// Object literal shorthand syntax
var data = [10, 20, 30];
var num = 100;
var obj = {
    name: "John",
    age: 30
};

var newObj = {
    obj, // same as obj: obj
    data, // same as data: data
    num // same as num: num
};


// var obj = {
//     num: 10
// };
// console.log(obj.num); // 10 -> dot notation
// console.log(obj["num"]); // 10 -> bracket/Array/index notation
// var obj2 = {};
// obj2[Math.random()] = 20;


var data = [10, 20, 30];

var data2 = data.map(
    function (item, index) {
        var obj = {};
        obj["element_" + index] = item; //computed property 
        return obj;
    }
);

var data3 = {};
data.forEach(
    function (item, index) {
        data3["element_" + index] = item;
    }
);
console.log(data3);

// signaling
function f1(cb) {
    console.log("f1");
    setTimeout(function () {
        cb(true);
    }, 1000);
}

function f2() {
    console.log("f2");
    function cb(isSuccess) {
        if (isSuccess) {
            console.log("f2 executed after f1");
        } else {
            console.log("failed");
        }
    }
}
// Node js do like this



// Another way:

function f1(success, error) {
    console.log("f1");
    setTimeout(function () {
        success();
    }, 1000);
}

function f2() {
    console.log("f2");
    f1(
        function success() {
            console.log("f2 executed after f1");
        },
        function error() {
            console.log("failed");
        }
    );
}

// third version: ES6 promise

function f1() {
    var promise = new Promise(
        function onThen(resolve, reject) { // when then is called this will get fired
            setTimeout(
                function () {
                    console.log("f1");
                    resolve();
                }, 1000
            )
        }
    );
    return promise;
}

function f2() {
    console.log("f2 before f1");
    var promise = f1();
    f3(promise);
}

function f3(obj) {
    promise.then(  // wait till f1 is done
        function success() {
            console.log("f2 executed after f1");
        },
        function error() {
            console.log("failed");
        }
    );
}


// Async/Await


async function f2() {
    console.log("f2 before f1");
    try {
        await f1();
        console.log("f2 executed after f1");
    }
    catch (err) {
        console.log("failed");
    }
}




// HTTP Browser - HTTP call
// HTTP/HTTPS
// WS - WebSocket WSS - Secure WebSocket

function callApi() {
    var xhr = new XMLHttpRequest();
    var apiEndpoint = "";
    xhr.open(
        "GET", //HTTP GET
        apiEndpoint, // URL
        true // async
    );
    var obj = {
        name: "John",
        age: 30
    }
    var objJson = JSON.stringify(obj);
    xhr.onload = function () { //success
        var data = xhr.response;
        console.log(data);
    }
    xhr.onerror = function () { //error
    }
    xhr.send(objJson); // send the data
}