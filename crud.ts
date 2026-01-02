let MyId: number = 1;

interface User {
  readonly id: number;
  name: string;
  email: string;
}

type UpdateUser = {
  id: number;
} & Partial<Omit<User, "id">>;

const users: User[] = [];

function createUser(user: User) {
  users.push(user);
}

function updateUser(update: UpdateUser): void {
  const index = users.findIndex((user) => user.id === update.id);

  if (index === -1) {
    console.error(`User with id ${update.id} not found.`);
    return;
  }

  users[index] = {
    ...users[index],
    ...update,
    id: users[index].id, // id stays immutable
  };

  console.log(`Updated user with id ${update.id}`);
}

function deleteUser(id: number) {
  const index = users.findIndex((users) => users.id === id);
  if (index === -1) {
    console.error(`User with id ${id} not found.`);
    return;
  }
  users.splice(index, 1);
  console.log(`Deleted user with id ${id}`);
}

createUser({
  id: MyId++,
  name: "dagode",
  email: "mdagode@gmail.com",
});
createUser({
  id: MyId++,
  name: "Marc Gerald",
  email: "marc@gmail.com",
});

createUser({
  id: MyId++,
  name: "Gerald",
  email: "gerald@gmail.com",
});
updateUser({ id: 3, email: "new@gmail.com" });
updateUser({ id: 4, email: "new@gmail123.com" });

deleteUser(1);
console.log(users);
