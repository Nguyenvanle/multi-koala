import { UserBody } from "./user";

export type RegisterBodyType = {
  token: string;
  user: UserBody;
  authenticated: boolean;
};

export type RegisterRes = {
  code: number;
  message: string;
  result: RegisterBodyType;
};

export type RegisterBody = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};
