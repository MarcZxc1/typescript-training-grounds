type Role = "ADMIN" | "EDITOR" | "VIEWER";
type Action = "view" | "edit" | "delete";
type Resource = "users" | "posts" | "comments";

type Permission = `${Action}:${Resource}`;

const SYSTEM_PERMISSION: any = {
  ADMIN: ["view:users", "delete:users", "edit:posts"],
  EDITOR: ["view:posts", "edit:posts"],
  VIEWER: ["view:posts"],
};

function hasPermision(role: Role, permission: Permission): boolean {
  const permissions = SYSTEM_PERMISSION[role];
  return permissions.includes(permission);
}

console.log(hasPermision("EDITOR", "edit:posts"));
console.log(hasPermision("VIEWER", "delete:users"));
