import { UserBody } from "../../user/types/user";

export type LoginBodyType = {
  token: string;
  user: UserBody;
  authenticated: boolean;
};

export type LoginRes = {
  code: number;
  message: string;
  result: LoginBodyType;
};

export type LoginBody = {
  username: string;
  password: string;
};
