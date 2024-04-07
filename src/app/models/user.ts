export interface IUser {
  email: string;
  id: number;
  password?: string;
  fio?: string;
  roles?: Array<IRoles>;
}

export interface IRoles {
  id: number;
  name: 'USER' | 'ADMIN';
  UserRole: {
    id: number;
    userId: number;
    roleId: number;
  };
}
