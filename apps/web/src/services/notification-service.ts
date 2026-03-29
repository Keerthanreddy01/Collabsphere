/**
 * Notification Service
 * API calls for notification management
 */

import { apiClient } from '@/services/api-client';

export interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
  createdAt: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  types: {
    projectUpdates: boolean;
    applicationUpdates: boolean;
    messages: boolean;
    follows: boolean;
    comments: boolean;
  };
}

/**
 * Get user notifications
 */
export const getNotifications = async (
  filters?: {
    page?: number;
    limit?: number;
    read?: boolean;
  }
): Promise<{ notifications: NotificationItem[]; total: number; unread: number }> => {
  try {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.limit) params.append('limit', String(filters.limit));
    if (filters?.read !== undefined) params.append('read', String(filters.read));

    return await apiClient.get(`/notifications?${params.toString()}`);
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (
  notificationId: string
): Promise<{ success: boolean }> => {
  try {
    return await apiClient.put(`/notifications/${notificationId}/read`);
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    throw error;
  }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (): Promise<{ success: boolean }> => {
  try {
    return await apiClient.put('/notifications/read-all');
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error);
    throw error;
  }
};

/**
 * Delete notification
 */
export const deleteNotification = async (notificationId: string): Promise<{ success: boolean }> => {
  try {
    return await apiClient.delete(`/notifications/${notificationId}`);
  } catch (error) {
    console.error('Failed to delete notification:', error);
    throw error;
  }
};

/**
 * Clear all notifications
 */
export const clearAllNotifications = async (): Promise<{ success: boolean }> => {
  try {
    return await apiClient.delete('/notifications/all');
  } catch (error) {
    console.error('Failed to clear all notifications:', error);
    throw error;
  }
};

/**
 * Get notification preferences
 */
export const getNotificationPreferences = async (): Promise<NotificationPreferences> => {
  try {
    return await apiClient.get('/notifications/preferences');
  } catch (error) {
    console.error('Failed to fetch notification preferences:', error);
    throw error;
  }
};

/**
 * Update notification preferences
 */
export const updateNotificationPreferences = async (
  preferences: Partial<NotificationPreferences>
): Promise<NotificationPreferences> => {
  try {
    return await apiClient.put('/notifications/preferences', preferences);
  } catch (error) {
    console.error('Failed to update notification preferences:', error);
    throw error;
  }
};

/**
 * Subscribe to push notifications
 */
export const subscribeToPushNotifications = async (
  token: string
): Promise<{ success: boolean }> => {
  try {
    return await apiClient.post('/notifications/push/subscribe', { token });
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    throw error;
  }
};

/**
 * Unsubscribe from push notifications
 */
export const unsubscribeFromPushNotifications = async (): Promise<{ success: boolean }> => {
  try {
    return await apiClient.post('/notifications/push/unsubscribe');
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
    throw error;
  }
};
