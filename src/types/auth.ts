export type DecodedToken = {
  username: string;
  exp: number;
  iat: number;
};

export type User = {
  accessToken: string;
  decoded: DecodedToken;
};

export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
