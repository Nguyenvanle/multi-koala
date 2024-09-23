export type LogoutBody = {
  token: string;
};

export type LogoutBodyType = {
  token: string;
  user: string;
  authenticated: boolean;
};

export type LogoutRes = {
  code: number;
  message: string;
  result: LogoutBodyType;
};
