# 🛠 AntiADHD 구현 상세

## 1. 데이터 구조

### Firestore 컬렉션 구조

```typescript
// 프로젝트
/projects/{projectId}
{
  name: string
  ownerId: string
  members: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
  settings: {
    theme: string
    notifications: boolean
  }
}

// 매트릭스
/projects/{projectId}/matrix/{date}
{
  quadrant1: Task[]
  quadrant2: Task[]
  quadrant3: Task[]
  quadrant4: Task[]
}

// 태스크
interface Task {
  id: string
  title: string
  description: string
  assignees: string[]
  dueDate: Timestamp
  tags: string[]
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  createdAt: Timestamp
  updatedAt: Timestamp
}

// 캘린더 이벤트
/projects/{projectId}/calendar/{eventId}
{
  title: string
  start: Timestamp
  end: Timestamp
  color: string
  description: string
  attendees: string[]
  isRecurring: boolean
  recurrenceRule?: string
}

// 채팅 메시지
/projects/{projectId}/chatMessages/{msgId}
{
  senderId: string
  senderName: string
  message: string
  timestamp: Timestamp
  attachments?: {
    type: string
    url: string
  }[]
}
```

## 2. 실시간 동기화 구현

### 매트릭스 동기화
```typescript
// 매트릭스 실시간 구독
const unsubscribe = onSnapshot(
  doc(db, 'projects', projectId, 'matrix', date),
  (doc) => {
    if (doc.exists()) {
      const data = doc.data()
      // UI 업데이트
    }
  }
)

// 태스크 이동 시
const moveTask = async (taskId: string, fromQuadrant: number, toQuadrant: number) => {
  const batch = writeBatch(db)
  // 원래 사분면에서 제거
  batch.update(doc(db, 'projects', projectId, 'matrix', date), {
    [`quadrant${fromQuadrant}`]: arrayRemove(taskId)
  })
  // 새 사분면에 추가
  batch.update(doc(db, 'projects', projectId, 'matrix', date), {
    [`quadrant${toQuadrant}`]: arrayUnion(taskId)
  })
  await batch.commit()
}
```

### 채팅 동기화
```typescript
// 채팅 메시지 구독
const unsubscribe = onSnapshot(
  query(
    collection(db, 'projects', projectId, 'chatMessages'),
    orderBy('timestamp', 'desc'),
    limit(50)
  ),
  (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        // 새 메시지 UI에 추가
      }
    })
  }
)

// 타이핑 상태 동기화
const updateTypingStatus = async (isTyping: boolean) => {
  await setDoc(doc(db, 'projects', projectId, 'chatTyping', userId), {
    isTyping,
    timestamp: serverTimestamp()
  })
}
```

## 3. UI/UX 구현 상세

### 매트릭스 뷰
- 드래그 앤 드롭: react-dnd 사용
- 반응형 그리드: CSS Grid
- 애니메이션: Framer Motion
- 다크모드: Tailwind CSS

### 태스크 상세 모달
- 제목/설명 편집
- 담당자 지정
- 마감일 설정
- 태그 관리
- 우선순위 설정

### 캘린더 뷰
- 월간/주간/일간 뷰
- 드래그로 일정 조정
- 색상 구분
- 반복 일정 설정

### 채팅 패널
- 실시간 메시지
- 타이핑 표시
- 파일 첨부
- 이모지 지원

## 4. 보안 & 권한 관리

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid));
      
      match /matrix/{date} {
        allow read, write: if request.auth != null && 
          exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid));
      }
      
      match /chatMessages/{messageId} {
        allow read: if request.auth != null && 
          exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid));
        allow create: if request.auth != null && 
          exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid));
      }
    }
  }
}
```

## 5. 성능 최적화

### 클라이언트 사이드
- React.memo 사용
- 가상화 (react-window)
- 이미지 최적화
- 코드 스플리팅

### 서버 사이드
- 캐싱 전략
- 인덱싱
- 배치 처리
- 오프라인 지원 