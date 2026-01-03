interface User {
  name: string;
  isAdmin: boolean;
}

function getUsers(user: User[]) {
  return user.filter((user) => user.isAdmin === false);
}

// --- TEST DATA ---
const userList: User[] = [
  { name: "Alice", isAdmin: true },
  { name: "Bob", isAdmin: false },
  { name: "Charlie", isAdmin: true },
];

console.log(getUsers(userList));
