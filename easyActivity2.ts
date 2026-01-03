interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

function formatProfile(user: User) {
  const status = user.isAdmin ? "admin" : "member";
  return `Welcome, ${user.name}! You have ${status} status`;
}

const myUser: User = {
  name: "Marc Gerald Dagode",
  age: 21,
  isAdmin: true,
};

console.log(formatProfile(myUser));
