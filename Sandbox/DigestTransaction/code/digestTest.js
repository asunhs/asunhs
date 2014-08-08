var vector = [
    { from : 'A', to : 'B', amount: 10000 },
    { from : 'A', to : 'C', amount: 15000 },
    { from : 'A', to : 'D', amount: 5000  },
    { from : 'B', to : 'A', amount: 3000  },
    { from : 'B', to : 'C', amount: 5000  },
    { from : 'C', to : 'A', amount: 7000  },
    { from : 'C', to : 'B', amount: 10000 },
    { from : 'C', to : 'D', amount: 14000 },
    { from : 'C', to : 'A', amount: 10000 },
    { from : 'C', to : 'B', amount: 15000 },
    { from : 'C', to : 'A', amount: 5000  },
    { from : 'C', to : 'D', amount: 3000  },
    { from : 'A', to : 'B', amount: 5000  },
    { from : 'A', to : 'C', amount: 5000  },
    { from : 'A', to : 'B', amount: 7000  },
    { from : 'A', to : 'B', amount: 10000 },
    { from : 'A', to : 'C', amount: 14000 },
    { from : 'A', to : 'D', amount: 10000 },
    { from : 'B', to : 'D', amount: 5000  }
];



var summary = DigestTransaction.summarize(vector);


var nodes = {
    A: 10, B: -8, C: 4, D: 7, E: -15, F: -12, G: 6, H: 8
};

var nodes2 = _.extend({ I: -5, J: 7, K: -4, L: 2}, nodes);


function print(methods) {
    methods.forEach(function (method) {
        console.log(method.from, '->', method.to, method.amount);
    });
}





// TEST CODE

console.log(nodes);
console.time("Find Zero Sum : 8 members");
var result1 = DigestTransaction.getMethods(nodes);
console.timeEnd("Find Zero Sum : 8 members");
print(result1);

console.log(nodes2);
console.time("Find Zero Sum : 12 members");
var result = DigestTransaction.getMethods(nodes2);
console.timeEnd("Find Zero Sum : 12 members");
print(result);

console.log(summary);
console.time("Find Zero Sum : 4 members");
var result2 = DigestTransaction.getMethods(DigestTransaction.summarize(vector));
console.timeEnd("Find Zero Sum : 4 members");
print(result2);