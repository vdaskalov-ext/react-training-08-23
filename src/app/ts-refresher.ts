// number
let x = 1;
let y: number;
y = 4;
const pi = 3.1415;

x = 5;
y = 7;
// x = '5'; // ERROR

console.log(x + y);
console.log(pi);

// string
const firstName = 'John';
const lastName = 'Doe';

console.log(firstName + ' ' + lastName);
const fullName = `Fullname: ${firstName} ${lastName}`;
console.log(fullName);

// boolean
let isDone = false;
isDone = true;
// isDone = 1; // ERROR
console.log(isDone);

// array
const numbers: number[] = [1, 2, 3, 4, 5];
console.log(numbers);

const mixed: any[] = [1, '2', 3, {}];
console.log(mixed);

// tuple
type CustomTuple = [number, string, number];

const t: CustomTuple = [1, '2', 3];
console.log(t);

const tuple = [1, 'abc'] as const;
console.log(tuple);

// enum
enum Color {
  RED = 'RED', // = 0
  GREEN = 'GREEN', // = 1
  BLUE = 'BLUE', // 2
}
console.log(Color.RED);

// object
const ColorObj = {
  red: () => '#ff0000',
  green: () => '#00ff00',
  blue: () => '#0000ff',
};
console.log(ColorObj.red());

// functions
function add(x: number, y: number): number {
  return x + y;
}
console.log(add(1, 2));

const customAdd = add;
console.log(customAdd(1, 2));

const multiply = function (x: number, y: number): number {
  return x * y;
};
console.log(multiply(1, 2));

const divide = (x: number, y: number): number => {
  return x / y;
};
console.log(divide(1, 2));

const subtract = (x: number, y: number): number => x - y;
console.log(subtract(1, 2));

const addFactory = (x: number) => {
  return (y: number) => {
    return add(x, y);
  };
};

const add5 = addFactory(5);
console.log(add5(4));

const multiplyFactory = (x: number) => (y: number) => multiply(x, y);
const multiply10 = multiplyFactory(10);
console.log(multiply10(2));

type NumberProcessor = (x: number, y: number) => number;

const processNumbers = (
  x: number,
  y: number,
  processor: NumberProcessor,
  postProcessor: NumberProcessor
) => {
  return postProcessor(processor(x, y), processor(x, y));
};

interface User {
  firstName: string;
  lastName: string;
  age: number;
  address?: string;
  meta?: string | number;
}

const user: User = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  address: '123 Main St',
};
console.log(user);
