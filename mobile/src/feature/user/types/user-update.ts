export type RoleBody = {
  roleName: string;
  roleDescription: string;
  permissions: [];
};

export type RoleBodyList = RoleBody[];

export type ImageBody = {
  imageId: string;
  imageUrl: string;
};

export type UserBody = {
  firstname: string;
  lastname: string;
  userBirth: string;
  userBio: string;
  userHometown: string;
  email: string;
  image: {
    imageId: string;
    imageUrl: string;
  };
  roles: RoleBodyList;
  firstLogin: boolean;
};

export type UserListBody = UserBody[];

export type UserRes = {
  code: number;
  message: string;
  result: UserBody;
};

export type UserListRes = {
  code: number;
  message: string;
  result: UserListBody;
};

export type UserPost = {
  password: "12345678";
  firstname: string;
  lastname: string;
  userBirth: string;
  email: string;
  userBio: string;
  userHometown: string;
  firstLogin: boolean;
};
