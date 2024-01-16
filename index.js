// Collection Functions
function myEach(collection, callback) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        callback(collection[i]);
      }
    } else if (typeof collection === 'object' && collection !== null) {
      for (let key in collection) {
        callback(collection[key], key);
      }
    }
    return collection;
  }
  
  function myMap(collection, callback) {
    const result = [];
    myEach(collection, (value, key) => {
      result.push(callback(value, key));
    });
    return result;
  }
  
  function myReduce(collection, callback, acc) {
    myEach(collection, (value, key) => {
      acc = callback(acc, value, key, collection);
    });
    return acc;
  }
  
  function myFind(collection, predicate) {
    let result;
    myEach(collection, (value, key) => {
      if (predicate(value)) {
        result = value;
        return false; // Break the loop when a match is found
      }
    });
    return result;
  }
  
  function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, (value, key) => {
      if (predicate(value)) {
        result.push(value);
      }
    });
    return result;
  }
  
  function mySize(collection) {
    return myReduce(collection, (acc) => acc + 1, 0);
  }
  
  // Array Functions
  function myFirst(array, n) {
    if (n) {
      return array.slice(0, n);
    }
    return array[0];
  }
  
  function myLast(array, n) {
    if (n) {
      return array.slice(-n);
    }
    return array[array.length - 1];
  }
  
  // Bonus Functions
  function mySortBy(array, callback) {
    return array.slice().sort((a, b) => callback(a) - callback(b));
  }
  
  function myFlatten(array, shallow, newArr = []) {
    myEach(array, (value) => {
      if (Array.isArray(value) && !shallow) {
        myFlatten(value, false, newArr);
      } else {
        newArr.push(value);
      }
    });
    return newArr;
  }
  
  // Object Functions
  function myKeys(object) {
    const keys = [];
    myEach(object, (value, key) => {
      keys.push(key);
    });
    return keys;
  }
  
  function myValues(object) {
    const values = [];
    myEach(object, (value) => {
      values.push(value);
    });
    return values;
  }
  
  // Example Usage
  const sampleArray = [1, 2, 3, 4, 5];
  const sampleObject = { one: 1, two: 2, three: 3 };
  
  console.log(myEach(sampleArray, (num) => console.log(num))); // alerts each number in turn and returns the original collection
  console.log(myEach(sampleObject, (num) => console.log(num))); // alerts each number value in turn and returns the original collection
  
  console.log(myMap(sampleArray, (num) => num * 3)); // [3, 6, 9]
  console.log(myMap(sampleObject, (num) => num * 3)); // [3, 6, 9]
  
  console.log(myReduce(sampleArray, (acc, val) => acc + val, 10)); // 25
  console.log(myReduce(sampleObject, (acc, val) => acc + val)); // 6
  
  console.log(myFind(sampleArray, (num) => num % 2 === 0)); // 2
  console.log(myFind(sampleObject, (num) => num % 2 === 0)); // 2
  
  console.log(myFilter(sampleArray, (num) => num % 2 === 0)); // [2, 4]
  console.log(myFilter(sampleObject, (num) => num % 2 === 0)); // []
  
  console.log(mySize(sampleArray)); // 5
  console.log(mySize(sampleObject)); // 3
  
  console.log(myFirst(sampleArray, 3)); // [1, 2, 3]
  console.log(myFirst(sampleObject)); // 1
  
  console.log(myLast(sampleArray, 3)); // [3, 4, 5]
  console.log(myLast(sampleObject)); // 3
  
  console.log(mySortBy([1, 2, 3, 4, 5, 6], (num) => Math.sin(num))); // [5, 4, 6, 3, 1, 2]
  
  const stooges = [
    { name: 'moe', age: 40 },
    { name: 'larry', age: 50 },
    { name: 'curly', age: 60 },
  ];
  console.log(mySortBy(stooges, (stooge) => stooge.name)); // [{ name: 'curly', age: 60 }, { name: 'larry', age: 50 }, { name: 'moe', age: 40 }]
  
  console.log(myFlatten([1, [2], [3, [[4]]]])); // [1, 2, 3, 4]
  console.log(myFlatten([1, [2], [3, [[4]]]], true)); // [1, 2, 3, [[4]]]
  
  console.log(myKeys({ one: 1, two: 2, three: 3 })); // ["one", "two", "three"]
  console.log(myValues({ one: 1, two: 2, three: 3 })); // [1, 2, 3]
  