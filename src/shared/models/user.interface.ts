export interface UserProfile {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}
export interface UpdateUserPayload {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  avatar?: string;
}

export enum UserProfileLabels {
  "email" = "Email",
  "role" = "Role",
  "creationAt" = "Created at",
  "updatedAt" = "Updated at",
}

