import { UserBody } from "./user";

export type AuthBody = {
  token: string;
  user: UserBody;
  authenticated: boolean;
};

export type AuthListBody = AuthBody[];

export type AuthRes = {
  code: number;
  message: string;
  result: AuthBody;
};

export type AuthListRes = {
  code: number;
  message: string;
  result: AuthListBody;
};
