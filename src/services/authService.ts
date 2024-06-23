import { getProfilePath } from "shared/api-routes";

import { UserProfile } from "shared/models/user.interface";
import api from "userApi";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const getJWTToken = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("access_token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.refresh_token);
  return response.data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>(getProfilePath);

  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

