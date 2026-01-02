type User = {
  readonly id: Date;
  username: string;
  bio?: string;
};

const user: User = {
  id: new Date("2025-01-02"),
  username: "Marc Gerald Dagode",
  bio: "Hello World, I AM HERE!",
};

function lockUser(inputUser: User): Readonly<User> {
  return Object.freeze(inputUser);
}
// user.username = "Halimaw";
// user.bio = "meoew mopew moew meo wemowew";
// console.log(user.username + user.bio);

const lockedMarc = lockUser(user);
// lockedMarc.bio = "dsadsad";
// lockedMarc.username = "marc";
console.log(lockedMarc);
