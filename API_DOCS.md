# API Documentation

Complete reference for all Collabsphere backend API endpoints.

## Base Configuration

```
Base URL: https://api.collabsphere.com/api/v1
Timeout: 30 seconds
Authentication: Bearer JWT token in Authorization header
```

## Authentication Endpoints

### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "user-1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "user": { ... }
}
```

### POST /auth/refresh
Refresh authentication token.

**Headers:** `Authorization: Bearer refreshToken`

**Response:**
```json
{
  "token": "eyJhbGc..."
}
```

### POST /auth/logout
Logout current user.

**Response:**
```json
{
  "success": true
}
```

## User Endpoints

### GET /users/:id
Get user profile by ID.

**Response:**
```json
{
  "id": "user-1",
  "email": "user@example.com",
  "name": "John Doe",
  "username": "johndoe",
  "avatar": "https://...",
  "bio": "Developer and designer",
  "followers": 150,
  "following": 75,
  "role": "user"
}
```

### GET /users/me
Get current authenticated user's profile.

**Response:** Same as GET /users/:id

### PUT /users/:id
Update user profile.

**Request:**
```json
{
  "name": "John Jane",
  "bio": "Updated bio",
  "avatar": "https://..."
}
```

**Response:** Updated user object

### GET /users/search?q=john&limit=10
Search for users.

**Parameters:**
- `q` (string): Search query
- `limit` (integer): Max results (default: 10)

**Response:**
```json
{
  "users": [ ... ],
  "total": 25
}
```

### POST /users/:id/follow
Follow a user.

**Response:**
```json
{
  "success": true,
  "followerId": "current-user-id",
  "followingId": "user-id"
}
```

### DELETE /users/:id/follow
Unfollow a user.

**Response:**
```json
{
  "success": true
}
```

### GET /users/:id/projects
Get user's projects.

**Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20)

**Response:**
```json
{
  "projects": [ ... ],
  "total": 45,
  "pages": 3
}
```

## Project Endpoints

### GET /projects
List all projects with filters.

**Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page (max: 100)
- `search` (string): Search query
- `technologies` (array): Filter by technologies
- `sort` (string): Sort by (recent, popular, trending)

**Response:**
```json
{
  "projects": [ ... ],
  "total": 500,
  "pages": 25,
  "currentPage": 1
}
```

### GET /projects/:id
Get project details.

**Response:**
```json
{
  "id": "project-1",
  "title": "Awesome Project",
  "description": "Project description...",
  "owner": { ... },
  "technologies": ["React", "Node.js"],
  "status": "active",
  "applicants": 12,
  "views": 450,
  "bookmarks": 23,
  "links": {
    "github": "https://github.com/...",
    "demo": "https://demo.com"
  }
}
```

### POST /projects
Create a new project.

**Request:**
```json
{
  "title": "New Project",
  "description": "Full description",
  "shortDescription": "Short desc",
  "technologies": ["React", "TypeScript"],
  "lookingFor": ["Backend Developer"],
  "links": {
    "github": "https://github.com/...",
    "demo": "https://..."
  }
}
```

**Response:** Created project object

### PUT /projects/:id
Update project.

**Request:** Same as POST with partial updates

**Response:** Updated project object

### DELETE /projects/:id
Delete project.

**Response:**
```json
{
  "success": true
}
```

### POST /projects/:id/apply
Apply to a project.

**Request:**
```json
{
  "message": "I'm interested in this project"
}
```

**Response:**
```json
{
  "success": true,
  "applicationId": "app-1",
  "status": "pending"
}
```

### POST /projects/:id/bookmark
Bookmark a project.

**Response:**
```json
{
  "success": true,
  "bookmarked": true
}
```

### DELETE /projects/:id/bookmark
Remove project bookmark.

**Response:**
```json
{
  "success": true,
  "bookmarked": false
}
```

### GET /projects/trending?limit=10
Get trending projects.

**Parameters:**
- `limit` (integer): Number of projects (default: 10)

**Response:**
```json
{
  "projects": [ ... ]
}
```

## Notification Endpoints

### GET /notifications
Get user's notifications.

**Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `read` (boolean): Filter by read status

**Response:**
```json
{
  "notifications": [ ... ],
  "total": 50,
  "unread": 12
}
```

### PUT /notifications/:id/read
Mark notification as read.

**Response:**
```json
{
  "success": true
}
```

### PUT /notifications/read-all
Mark all notifications as read.

**Response:**
```json
{
  "success": true
}
```

### DELETE /notifications/:id
Delete notification.

**Response:**
```json
{
  "success": true
}
```

### DELETE /notifications/all
Clear all notifications.

**Response:**
```json
{
  "success": true,
  "cleared": 50
}
```

### GET /notifications/preferences
Get notification preferences.

**Response:**
```json
{
  "emailNotifications": true,
  "pushNotifications": true,
  "inAppNotifications": true,
  "types": {
    "projectUpdates": true,
    "applicationUpdates": true,
    "messages": true,
    "follows": true,
    "comments": true
  }
}
```

### PUT /notifications/preferences
Update notification preferences.

**Request:** Same as GET response

**Response:** Updated preferences

## Error Responses

### 400 Bad Request
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid input",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "code": "UNAUTHORIZED",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "code": "FORBIDDEN",
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "code": "NOT_FOUND",
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "code": "RATE_LIMIT",
  "message": "Too many requests",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "code": "INTERNAL_ERROR",
  "message": "Something went wrong"
}
```

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per user
- **Headers**: 
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 95
  - `X-RateLimit-Reset`: 1234567890

## Pagination

All list endpoints support pagination:

**Parameters:**
- `page` (integer): Page number (1-indexed)
- `limit` (integer): Items per page (default: 20, max: 100)

**Response includes:**
```json
{
  "data": [ ... ],
  "total": 500,
  "pages": 25,
  "currentPage": 1,
  "pageSize": 20
}
```

## Filtering

### Project Filters
```
GET /projects?technologies=React,Node.js&status=active&sort=trending
```

### User Filters
```
GET /users?role=user&search=john
```

## Sorting

Supported sort options:
- `recent`: Newest first
- `popular`: Most popular first
- `trending`: Trending now

## WebSocket Events (Real-time)

Connect to `wss://api.collabsphere.com/socket`

### Available Events
- `notification:new` - New notification received
- `project:updated` - Project was updated
- `user:online` - User came online
- `message:new` - New message received

---

**API Version**: v1
**Last Updated**: 2024
**Documentation Status**: Complete
