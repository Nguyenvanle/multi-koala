import { UserBody } from "./user";

export type LoginBody = {
  token: string;
  user: UserBody;
  authenticated: boolean;
};

export type LoginRes = {
  code: number;
  message: string;
  result: LoginBody;
};
