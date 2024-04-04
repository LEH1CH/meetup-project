export interface IUser {
    email: string;
    id: number;
    roles: Array<IRoles>;
}

export interface IRoles {
    id: number,
    name: "USER" | "ADMIN",
    UserRole: {
        id: number,
        userId: number,
        roleId: number
    }
}