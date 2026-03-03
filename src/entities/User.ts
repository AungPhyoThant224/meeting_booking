export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OWNER' | 'USER';
  createdAt?: string;
}

export interface UserResponseData {
  users: User[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}