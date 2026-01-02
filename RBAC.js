var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var MyId = 1;
var users = [];
var createUser = function (user) {
    var newUser = __assign({ id: MyId++ }, user);
    users.push(newUser);
    console.log("User created: ID: ".concat(newUser.id, " ").concat(newUser.name, "  ").concat(newUser.email, " (").concat(newUser.role, ")"));
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
var login = function (email, password) {
    var foundUser = users.find(function (users) { return users.email === email && users.password === password; });
    if (!foundUser) {
        console.log("Invalid email or password");
        return;
    }
    console.log("Login Successful: ".concat(foundUser.name, " ROLE: ").concat(foundUser.role));
};
var deleteUser = function (id, currentUser) {
    // Only ADMIN can delete
    if (currentUser.role !== "ADMIN") {
        console.error("Permission denied: Only ADMIN can delete users");
        return;
    }
    var index = users.findIndex(function (user) { return user.id === id; });
    if (index === -1) {
        console.error("User with ID ".concat(id, " not found"));
        return;
    }
    var userToDelete = users[index];
    // Optional: prevent deleting other admins
    if (userToDelete.role === "ADMIN") {
        console.error("Cannot delete another ADMIN user");
        return;
    }
    users.splice(index, 1);
    console.log("User ".concat(userToDelete.name, " (ID: ").concat(id, ") deleted by ").concat(currentUser.name));
};
login("gerald@gmail.com", "password1234");
login("gerald@gmail.com", "password1233");
login("marc@gmail.com", "password123");
var adminUser = users.find(function (user) { return user.role === "ADMIN"; });
deleteUser(2, adminUser);
console.log(JSON.stringify(users));
