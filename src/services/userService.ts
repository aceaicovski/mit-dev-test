import { userPath } from "shared/api-routes";
import { UpdateUserPayload, UserProfile } from "shared/models/user.interface";
import api from "userApi";

export const updateUserProfile = async (
  userId: number,
  body: UpdateUserPayload
): Promise<UserProfile> => {
  const response = await api.put<UserProfile>(`${userPath}/${userId}`, body);

  return response.data;
};

export const deleteUserProfile = async (
  userId: number
): Promise<UserProfile> => {
  const response = await api.delete<UserProfile>(`${userPath}/${userId}`);

  return response.data;
};

