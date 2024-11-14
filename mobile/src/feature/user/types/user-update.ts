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
  image: {
    imageId: string;
    imageUrl: string;
  };
  email: string;
  roles: RoleBodyList;
  userBirth: string;
  token: string;
  userBio: string;
  userHometown: string;
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
  firstname: string;
  lastname: string;
  userBirth: string;
  userBio: string;
  userHometown: string;
};
