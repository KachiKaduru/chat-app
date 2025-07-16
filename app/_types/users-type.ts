export type Session = {
  user: SessionUser;
  expires: string;
};

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface User extends SessionUser {
  username: string | null;
  created_at: string;
}

export type Users = User[];
