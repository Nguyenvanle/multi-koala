export type RoleBody = {
  roleName: string;
  roleDescription: string;
  permissions: [];
};

export type RoleBodyList = RoleBody[];

export type ResultBody = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  userBirth: Date;
  userBio: string;
  userHometown: string;
  email: string;
  image: null;
  roles: RoleBodyList;
  deleted: boolean;
  firstLogin: boolean;
};

export type ResultRes = {
  code: number;
  message: string;
  result: ResultBody;
};

export type SignUpRes = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
};
