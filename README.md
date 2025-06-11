# AntiADHD - 생산성 향상을 위한 웹 애플리케이션

[English](#english) | [한국어](#korean)

<a id="english"></a>
## English

### Features

#### 1. Pomodoro Timer
- Fixed mini timer in bottom-right corner
- Expandable full timer view
- Customizable work/break durations
- Progress visualization
- Notification system

#### 2. User Interface
- Dark mode support
- Responsive design
- Intuitive navigation

#### 3. Tech Stack
- Next.js 15.2.4
- React 18.2.0
- TypeScript
- Tailwind CSS
- Firebase (Authentication & Database)

### Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd antiadhd
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
Create `.env.local` file and add Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

4. Run development server
```bash
pnpm dev
```

### Recent Updates
- Optimized Pomodoro timer position
- Improved file structure
- Fixed build and dependency issues

### Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<a id="korean"></a>
## 한국어

### 주요 기능

#### 1. 포모도로 타이머
- 우측 하단에 고정된 미니 타이머
- 확장 가능한 전체 타이머 뷰
- 작업/휴식 시간 커스터마이징
- 진행 상황 시각화
- 알림 기능

#### 2. 사용자 인터페이스
- 다크 모드 지원
- 반응형 디자인
- 직관적인 네비게이션

#### 3. 기술 스택
- Next.js 15.2.4
- React 18.2.0
- TypeScript
- Tailwind CSS
- Firebase (인증 및 데이터베이스)

### 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
cd antiadhd
```

2. 의존성 설치
```bash
pnpm install
```

3. 환경 변수 설정
`.env.local` 파일을 생성하고 Firebase 설정을 추가:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

4. 개발 서버 실행
```bash
pnpm dev
```

### 최근 업데이트
- 포모도로 타이머 위치 최적화
- 파일 구조 개선
- 빌드 및 의존성 문제 해결

### 기여하기
1. 프로젝트 포크하기
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성