let MyId = 1;

interface User {
  readonly id: number;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER" | "GUEST";
  bio?: string;
}

let users: User[] = [];

const createUser = (user: Omit<User, "id">) => {
  const newUser: User = {
    id: MyId++,
    ...user,
  };
  users.push(newUser);
  console.log(
    `User created: ID: ${newUser.id} ${newUser.name}  ${newUser.email} (${newUser.role})`,
  );
};

createUser({
  name: "Marc",
  email: "marc@gmail.com",
  password: "password123",
  role: "ADMIN",
});
createUser({
  name: "Gerald",
  email: "gerald@gmail.com",
  password: "password1234",
  role: "USER",
});

const login = (email: string, password: string) => {
  const foundUser = users.find(
    (users: User) => users.email === email && users.password === password,
  );
  if (!foundUser) {
    console.log("Invalid email or password");
    return;
  }
  console.log(`Login Successful: ${foundUser.name} ROLE: ${foundUser.role}`);
};

const deleteUser = (id: number, currentUser: User) => {
  // Only ADMIN can delete
  if (currentUser.role !== "ADMIN") {
    console.error(`Permission denied: Only ADMIN can delete users`);
    return;
  }

  const index = users.findIndex((user: User) => user.id === id);

  if (index === -1) {
    console.error(`User with ID ${id} not found`);
    return;
  }

  const userToDelete: User | undefined = users[index];

  if (!userToDelete) {
    console.error(`User with ID ${id} not found`);
  }
  if (userToDelete.role === "ADMIN") {
    console.error(`Cannot delete another ADMIN user`);
    return;
  }
  users.splice(index, 1);
  console.log(
    `User ${userToDelete.name} (ID: ${id}) deleted by ${currentUser.name}`,
  );
};

login("gerald@gmail.com", "password1234");
login("gerald@gmail.com", "password1233");
login("marc@gmail.com", "password123");

const adminUser = users.find((user: User) => user.role === "ADMIN")!;
// deleteUser(2, adminUser);

console.log(`Users`, JSON.stringify(users));
