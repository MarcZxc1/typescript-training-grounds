const add: number = 3 + 2;
type Person = {
  name: string;
  age: number;
  hobby?: string;
  isStudent: boolean;
};

let person1: Person = {
  name: "marc",
  age: 21,
  hobby: "Basketball",
  isStudent: true,
};

let person2: Person = {
  name: "Gerald",
  age: 21,
  hobby: "Football",
  isStudent: false,
};
let people = [person1, person2];
console.log(people);
