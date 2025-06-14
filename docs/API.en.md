# 🔌 AntiADHD API Documentation

## 1. REST API

### 1.1 Project API
```typescript
// Create Project
POST /api/projects
Request:
{
  name: string
  description?: string
  members?: string[]
}
Response:
{
  id: string
  name: string
  ownerId: string
  members: string[]
  createdAt: Timestamp
}

// List Projects
GET /api/projects
Response:
{
  projects: Project[]
}

// Get Project Details
GET /api/projects/:id
Response:
{
  project: Project
  tasks: Task[]
  members: User[]
}

// Update Project
PUT /api/projects/:id
Request:
{
  name?: string
  description?: string
  members?: string[]
}
Response:
{
  project: Project
}

// Delete Project
DELETE /api/projects/:id
Response:
{
  success: boolean
}
```

### 1.2 Task API
```typescript
// Create Task
POST /api/projects/:projectId/tasks
Request:
{
  title: string
  description?: string
  quadrant: 1 | 2 | 3 | 4
  assignees?: string[]
  dueDate?: Timestamp
  tags?: string[]
  priority?: 'low' | 'medium' | 'high'
}
Response:
{
  task: Task
}

// List Tasks
GET /api/projects/:projectId/tasks
Query Parameters:
- quadrant?: number
- status?: string
- assignee?: string
Response:
{
  tasks: Task[]
}

// Update Task
PUT /api/projects/:projectId/tasks/:taskId
Request:
{
  title?: string
  description?: string
  quadrant?: number
  status?: string
  assignees?: string[]
  dueDate?: Timestamp
  tags?: string[]
  priority?: string
}
Response:
{
  task: Task
}

// Delete Task
DELETE /api/projects/:projectId/tasks/:taskId
Response:
{
  success: boolean
}
```

### 1.3 User API
```typescript
// Get User Profile
GET /api/users/me
Response:
{
  user: User
}

// Update User Profile
PUT /api/users/me
Request:
{
  displayName?: string
  photoURL?: string
  settings?: UserSettings
}
Response:
{
  user: User
}

// Search Users
GET /api/users/search
Query Parameters:
- q: string
Response:
{
  users: User[]
}
```

## 2. WebSocket API

### 2.1 Real-time Events
```typescript
// Task Events
interface TaskEvents {
  'task:created': (task: Task) => void
  'task:updated': (task: Task) => void
  'task:deleted': (taskId: string) => void
  'task:moved': (taskId: string, quadrant: number) => void
}

// Chat Events
interface ChatEvents {
  'chat:message': (message: ChatMessage) => void
  'chat:typing': (userId: string, isTyping: boolean) => void
  'chat:read': (userId: string, messageId: string) => void
}

// User Events
interface UserEvents {
  'user:online': (userId: string) => void
  'user:offline': (userId: string) => void
  'user:status': (userId: string, status: string) => void
}
```

### 2.2 Event Subscription
```typescript
// Subscribe to Task
subscribeToTask(projectId: string, taskId: string) {
  return {
    unsubscribe: () => void
  }
}

// Subscribe to Chat
subscribeToChat(projectId: string) {
  return {
    unsubscribe: () => void
  }
}

// Subscribe to User
subscribeToUser(userId: string) {
  return {
    unsubscribe: () => void
  }
}
```

## 3. Error Handling

### 3.1 Error Codes
```typescript
enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}
```

### 3.2 Error Response
```typescript
interface ErrorResponse {
  code: ErrorCode
  message: string
  details?: any
}
```

## 4. Authentication

### 4.1 Token-based Authentication
```typescript
// Request Header
{
  'Authorization': 'Bearer <token>'
}

// Token Refresh
POST /api/auth/refresh
Response:
{
  token: string
  expiresIn: number
}
```

### 4.2 Permission Check
```typescript
// Permission Levels
enum PermissionLevel {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST'
}

// Permission Middleware
function checkPermission(level: PermissionLevel) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Permission check logic
  }
}
``` 