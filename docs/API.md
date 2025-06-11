# 🔌 AntiADHD API 문서

## 1. REST API

### 1.1 프로젝트 API
```typescript
// 프로젝트 생성
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

// 프로젝트 목록 조회
GET /api/projects
Response:
{
  projects: Project[]
}

// 프로젝트 상세 조회
GET /api/projects/:id
Response:
{
  project: Project
  tasks: Task[]
  members: User[]
}

// 프로젝트 수정
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

// 프로젝트 삭제
DELETE /api/projects/:id
Response:
{
  success: boolean
}
```

### 1.2 태스크 API
```typescript
// 태스크 생성
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

// 태스크 목록 조회
GET /api/projects/:projectId/tasks
Query Parameters:
- quadrant?: number
- status?: string
- assignee?: string
Response:
{
  tasks: Task[]
}

// 태스크 수정
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

// 태스크 삭제
DELETE /api/projects/:projectId/tasks/:taskId
Response:
{
  success: boolean
}
```

### 1.3 사용자 API
```typescript
// 사용자 프로필 조회
GET /api/users/me
Response:
{
  user: User
}

// 사용자 프로필 수정
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

// 사용자 검색
GET /api/users/search
Query Parameters:
- q: string
Response:
{
  users: User[]
}
```

## 2. WebSocket API

### 2.1 실시간 이벤트
```typescript
// 태스크 이벤트
interface TaskEvents {
  'task:created': (task: Task) => void
  'task:updated': (task: Task) => void
  'task:deleted': (taskId: string) => void
  'task:moved': (taskId: string, quadrant: number) => void
}

// 채팅 이벤트
interface ChatEvents {
  'chat:message': (message: ChatMessage) => void
  'chat:typing': (userId: string, isTyping: boolean) => void
  'chat:read': (userId: string, messageId: string) => void
}

// 사용자 이벤트
interface UserEvents {
  'user:online': (userId: string) => void
  'user:offline': (userId: string) => void
  'user:status': (userId: string, status: string) => void
}
```

### 2.2 이벤트 구독
```typescript
// 태스크 구독
subscribeToTask(projectId: string, taskId: string) {
  return {
    unsubscribe: () => void
  }
}

// 채팅 구독
subscribeToChat(projectId: string) {
  return {
    unsubscribe: () => void
  }
}

// 사용자 구독
subscribeToUser(userId: string) {
  return {
    unsubscribe: () => void
  }
}
```

## 3. 에러 처리

### 3.1 에러 코드
```typescript
enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}
```

### 3.2 에러 응답
```typescript
interface ErrorResponse {
  code: ErrorCode
  message: string
  details?: any
}
```

## 4. 인증

### 4.1 토큰 기반 인증
```typescript
// 요청 헤더
{
  'Authorization': 'Bearer <token>'
}

// 토큰 갱신
POST /api/auth/refresh
Response:
{
  token: string
  expiresIn: number
}
```

### 4.2 권한 검사
```typescript
// 권한 레벨
enum PermissionLevel {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST'
}

// 권한 검사 미들웨어
function checkPermission(level: PermissionLevel) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 권한 검사 로직
  }
}
```
