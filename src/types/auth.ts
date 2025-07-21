export type DecodedToken = {
  username: string;
  exp: number;
  iat: number;
};

export type User = {
  accessToken: string;
  decoded: DecodedToken;
};
