import { PermissionsList } from "./permissions";

export type Roles = {
  roleName: string;
  roleDescription: string;
  permissions: PermissionsList;
};

export type RolesList = Roles[];
