/**
 * User Service
 * API calls and business logic for user-related operations
 */

import { apiClient } from '@/services/api-client';
import { User } from '@/types';

export interface UserProfile extends User {
  followers: number;
  following: number;
  bio?: string;
  avatar?: string;
  isDev?: boolean;
}

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    return await apiClient.get<UserProfile>(`/users/${userId}`);
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

/**
 * Get current user profile
 */
export const getCurrentUserProfile = async (): Promise<UserProfile> => {
  try {
    return await apiClient.get<UserProfile>('/users/me');
  } catch (error) {
    console.error('Failed to fetch current user profile:', error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile> => {
  try {
    return await apiClient.put<UserProfile>(`/users/${userId}`, updates);
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};

/**
 * Get user by username
 */
export const getUserByUsername = async (username: string): Promise<UserProfile> => {
  try {
    return await apiClient.get<UserProfile>(`/users/username/${username}`);
  } catch (error) {
    console.error('Failed to fetch user by username:', error);
    throw error;
  }
};

/**
 * Follow user
 */
export const followUser = async (userId: string): Promise<{ success: boolean }> => {
  try {
    return await apiClient.post(`/users/${userId}/follow`, {});
  } catch (error) {
    console.error('Failed to follow user:', error);
    throw error;
  }
};

/**
 * Unfollow user
 */
export const unfollowUser = async (userId: string): Promise<{ success: boolean }> => {
  try {
    return await apiClient.delete(`/users/${userId}/follow`);
  } catch (error) {
    console.error('Failed to unfollow user:', error);
    throw error;
  }
};

/**
 * Get user's projects
 */
export const getUserProjects = async (
  userId: string,
  page: number = 1,
  limit: number = 20
) => {
  try {
    return await apiClient.get(`/users/${userId}/projects?page=${page}&limit=${limit}`);
  } catch (error) {
    console.error('Failed to fetch user projects:', error);
    throw error;
  }
};

/**
 * Search users
 */
export const searchUsers = async (query: string, limit: number = 10) => {
  try {
    return await apiClient.get(`/users/search?q=${query}&limit=${limit}`);
  } catch (error) {
    console.error('Failed to search users:', error);
    throw error;
  }
};
