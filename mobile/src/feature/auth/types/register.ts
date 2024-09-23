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
  email: string;
};
