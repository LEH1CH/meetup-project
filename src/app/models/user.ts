export interface modelUser {
  email: string;
  id: number;
  password?: string;
  fio?: string;
  roles?: Array<modelRoles>;
}

export interface modelRoles {
  id: number;
  name: 'USER' | 'ADMIN';
  UserRole: {
    id: number;
    userId: number;
    roleId: number;
  };
}
