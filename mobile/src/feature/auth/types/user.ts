export type UserBody = {
  firstname: string;
  lastname: string;
  image: {
    imageId: string;
    imageUrl: string;
  };
  email: string;
  roles: string;
  userBirth: string;
  token: string;
  userBio: string;
  process: number;
  userHometown: string;
  isFirstLogin: boolean;
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
