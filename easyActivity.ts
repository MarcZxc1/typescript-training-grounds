// 1. TODO: Define UserStatus union
type UserStatus = "active" | "inactive";

// 2. TODO: Define the RawUser (what comes from the DB)
interface RawUser {
  id: number;
  full_name: string;
  user_status: UserStatus;
  last_login: string;
}

// 3. TODO: Define the CleanUser (what the Frontend wants)
interface CleanUser {
  id: number;
  firstName: string;
  isActive: boolean;
}

/**
 * 4. TODO: Implement this function
 * It should:
 * - Filter out 'inactive' users
 * - Split 'full_name' into just the first name
 * - Convert 'user_status' into a boolean 'isActive'
 */
function processUsers(users: RawUser[]): CleanUser[] {
  return users
    .filter((user) => {
      // Your logic to check for 'active' status
      return user.user_status === "active";
    })
    .map((user) => {
      // Your logic to return a CleanUser object
      return {
        id: user.id,
        firstName: user.full_name.split(" ")[0],
        isActive: user.user_status === "active",
      };
    });
}

// --- TEST CASE ---
const apiData: RawUser[] = [
  {
    id: 1,
    full_name: "Alice Smith",
    user_status: "active",
    last_login: "2024-01-01",
  },
  {
    id: 2,
    full_name: "Bob Jones",
    user_status: "inactive",
    last_login: "2024-01-02",
  },
  {
    id: 3,
    full_name: "Charlie Brown",
    user_status: "active",
    last_login: "2024-01-03",
  },
];

const cleaned = processUsers(apiData);
console.log(cleaned);
// Expected Output:
// [{ id: 1, firstName: "Alice", isActive: true }, { id: 3, firstName: "Charlie", isActive: true }]
