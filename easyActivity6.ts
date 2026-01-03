interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  level: number;
}

function updateUser(current: User, updates: Partial<User>): User {
  return { ...current, ...updates };
}
const dbData: User = {
  id: 1,
  name: "Gemini",
  age: 21,
  email: "test@example.com",
  level: 10,
};

const result = updateUser(dbData, { level: 12 });
console.log(result);
console.log(dbData);
