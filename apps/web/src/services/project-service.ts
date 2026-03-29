/**
 * Project Service
 * API calls and business logic for project-related operations
 */

import { apiClient } from '@/services/api-client';
import { Project } from '@/types';

export interface ProjectWithStats extends Project {
  applicants: number;
  views: number;
  bookmarks: number;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  technologies: string[];
  lookingFor?: string[];
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
}

/**
 * Get all projects with filters
 */
export const getProjects = async (
  filters?: {
    page?: number;
    limit?: number;
    search?: string;
    technologies?: string[];
    sort?: 'recent' | 'popular' | 'trending';
  }
): Promise<{ projects: ProjectWithStats[]; total: number; pages: number }> => {
  try {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.limit) params.append('limit', String(filters.limit));
    if (filters?.search) params.append('search', filters.search);
    if (filters?.technologies) params.append('technologies', filters.technologies.join(','));
    if (filters?.sort) params.append('sort', filters.sort);

    return await apiClient.get(`/projects?${params.toString()}`);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

/**
 * Get project by ID
 */
export const getProject = async (projectId: string): Promise<ProjectWithStats> => {
  try {
    return await apiClient.get<ProjectWithStats>(`/projects/${projectId}`);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    throw error;
  }
};

/**
 * Create new project
 */
export const createProject = async (input: CreateProjectInput): Promise<Project> => {
  try {
    return await apiClient.post<Project>('/projects', input);
  } catch (error) {
    console.error('Failed to create project:', error);
    throw error;
  }
};

/**
 * Update project
 */
export const updateProject = async (
  projectId: string,
  updates: Partial<CreateProjectInput>
): Promise<Project> => {
  try {
    return await apiClient.put<Project>(`/projects/${projectId}`, updates);
  } catch (error) {
    console.error('Failed to update project:', error);
    throw error;
  }
};

/**
 * Delete project
 */
export const deleteProject = async (projectId: string): Promise<{ success: boolean }> => {
  try {
    return await apiClient.delete(`/projects/${projectId}`);
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw error;
  }
};

/**
 * Apply to project
 */
export const applyToProject = async (
  projectId: string,
  message?: string
): Promise<{ success: boolean; applicationId: string }> => {
  try {
    return await apiClient.post(`/projects/${projectId}/apply`, { message });
  } catch (error) {
    console.error('Failed to apply to project:', error);
    throw error;
  }
};

/**
 * Bookmark project
 */
export const bookmarkProject = async (projectId: string): Promise<{ success: boolean }> => {
  try {
    return await apiClient.post(`/projects/${projectId}/bookmark`);
  } catch (error) {
    console.error('Failed to bookmark project:', error);
    throw error;
  }
};

/**
 * Remove bookmark
 */
export const removeBookmark = async (projectId: string): Promise<{ success: boolean }> => {
  try {
    return await apiClient.delete(`/projects/${projectId}/bookmark`);
  } catch (error) {
    console.error('Failed to remove bookmark:', error);
    throw error;
  }
};

/**
 * Get trending projects
 */
export const getTrendingProjects = async (limit: number = 10) => {
  try {
    return await apiClient.get(`/projects/trending?limit=${limit}`);
  } catch (error) {
    console.error('Failed to fetch trending projects:', error);
    throw error;
  }
};
