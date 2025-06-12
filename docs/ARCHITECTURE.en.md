# 🏗 AntiADHD Architecture Documentation

## 1. System Structure

### 1.1 Overall Architecture
```mermaid
graph TD
    A[Client] --> B[Next.js App]
    B --> C[Firebase Services]
    C --> D[Firestore]
    C --> E[Auth]
    C --> F[Storage]
    C --> G[Cloud Functions]
```

### 1.2 Data Flow
```mermaid
sequenceDiagram
    participant C as Client
    participant N as Next.js
    participant F as Firebase
    participant D as Database

    C->>N: Request
    N->>F: Authentication
    F-->>N: Token
    N->>D: Data Request
    D-->>N: Data
    N-->>C: Response
```

## 2. Component Structure

### 2.1 Directory Structure
```
app/
├── components/
│   ├── ui/           # Common UI components
│   ├── matrix/       # Matrix-related components
│   ├── calendar/     # Calendar-related components
│   ├── chat/         # Chat-related components
│   └── pomodoro/     # Pomodoro-related components
├── lib/
│   ├── firebase/     # Firebase settings
│   ├── hooks/        # Custom hooks
│   └── utils/        # Utility functions
└── models/           # Type definitions
```

### 2.2 Component Hierarchy
```mermaid
graph TD
    A[Layout] --> B[Header]
    A --> C[Main]
    A --> D[Footer]
    C --> E[Matrix]
    C --> F[Calendar]
    C --> G[Chat]
    C --> H[Pomodoro]
```

## 3. State Management

### 3.1 Global State
- **Auth Store**: User authentication state
- **Matrix Store**: Matrix data
- **Calendar Store**: Calendar events
- **Chat Store**: Chat messages
- **Pomodoro Store**: Timer state

### 3.2 State Flow
```mermaid
graph LR
    A[Action] --> B[Store]
    B --> C[Component]
    C --> D[UI]
```

## 4. Routing Structure

### 4.1 Page Structure
```
/                   # Dashboard
/matrix            # Matrix
/calendar          # Calendar
/chat              # Chat
/pomodoro          # Pomodoro
/settings          # Settings
```

### 4.2 Routing Logic
- Only authenticated users can access
- Supports dynamic routing
- Uses nested routing

## 5. Performance Optimization

### 5.1 Client Side
- Use React.memo
- Optimize with useMemo/useCallback
- Image optimization
- Code splitting

### 5.2 Server Side
- Use SSR/SSG
- Caching strategies
- API route optimization

## 6. Security Structure

### 6.1 Authentication Flow
```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant F as Firebase Auth
    participant S as Server

    U->>A: Login request
    A->>F: Authentication request
    F-->>A: Token issued
    A->>S: Token verification
    S-->>A: Authentication complete
```

### 6.2 Data Security
- Firebase Security Rules
- API route security
- CORS settings
- XSS prevention 