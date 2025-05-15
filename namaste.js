const value= [1,2,3,4];

function redius(arr){
  return Math.PI * arr * arr;
}
function area(arr){
  return 2 * Math.PI * arr;
}
function circumference(arr){
  return 4 * Math.PI * arr;
}

const calculate = function(arr, callback){
    let result = [];
    for(let i=0;i<arr.length;i++){
        result.push(callback(arr[i]));
    }
}

console.log(calculate(value, redius));
console.log(calculate(value, area));
console.log(calculate(value, circumference));