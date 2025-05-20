export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export enum Role {
  USER = "User",
  ADMIN = "Admin",
}
