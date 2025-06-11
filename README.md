# ANTI-ADHD: 4분할 체크리스트 관리 도구

[English](#english) | [한국어](#korean)

<a id="english"></a>
## English

> **Bringing structure to your thoughts, order to your day**

### Introduction

**ANTI-ADHD** is a task management tool based on the Eisenhower Matrix, specifically designed for users with ADHD. It helps you effectively manage your tasks by categorizing them based on importance and urgency.

### Motivation

> **Finding order in your chaos, clarity in your uncertainty**

We deeply understand how challenging life with ADHD can be. The constant flow of thoughts, unfinished tasks, and time slipping through your fingers like sand - we know these can be part of your daily experience.

This project is more than just a tool. It's a **dedicated companion to help you fully realize your potential**.

### Problems We Solve

- ⚠️ **Difficulty in prioritizing tasks**
- 🔄 **Loss of focus during task switching**
- ⏳ **Tendency to procrastinate important tasks**
- 📊 **Excessive multitasking**
- ⏰ **Time management challenges**
- 📝 **Difficulty in daily planning**

### Our Solution

The Eisenhower Matrix-based to-do list simplifies your complex world into four clear categories:

| | **Urgent** | **Not Urgent** |
|---|---|---|
| **Important** | Do Now | Plan |
| **Not Important** | Delegate | Eliminate |

This categorization brings peace to a mind struggling with distraction.

### Our Promise

**We support you in planning, executing, and completing every moment.** Small victories will accumulate into great achievements. We've started this journey understanding how your brain works uniquely and transforming it into a strength.

There will be days of failure. Moments when plans crumble and focus scatters. But this is just part of the journey, not a definition of your worth. Get back up, return to the matrix. **We'll always be here.**

### Core Features

- **📊 Matrix View**
  - Four-quadrant task organization
  - Drag-and-drop task management
  - Real-time task updates
  - Task priority visualization

- **⏱️ Pomodoro Timer**
  - Customizable work/break intervals
  - Task-specific time tracking
  - Break reminders
  - Session statistics

- **📝 Task Management**
  - Task creation and editing
  - Priority setting
  - Due date assignment
  - Task categorization

- **👥 Team Collaboration**
  - Real-time chat
  - Task assignment
  - Team member roles
  - Activity tracking

- **📅 Calendar Integration**
  - Task scheduling
  - Deadline management
  - Team availability
  - Event reminders

### Tech Stack

- **Frontend**
  - Next.js 15.2.4
  - React 18.2.0
  - TypeScript
  - Tailwind CSS

- **Backend**
  - Firebase Authentication
  - Firestore Database
  - Cloud Functions

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/octxxiii/Anti-ADHD.git
cd Anti-ADHD
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

### Documentation

- [Technical Design](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/TECHNICAL_DESIGN.md)
- [Architecture](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/ARCHITECTURE.md)
- [API Documentation](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/API.md)
- [Implementation Details](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/IMPLEMENTATION.md)
- [Roadmap](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/ROADMAP.md)
- [Deployment Guide](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/DEPLOYMENT.md)

### Development Info

- **Version**: 0.0.1 (Alpha)
- **Developer**: OctXXIII
- **Email**: kdyw123@gmail.com

### Deployment

This project is deployed on Vercel. You can access the latest version at:
- Production: [https://anti-adhd.vercel.app](https://anti-adhd.vercel.app)
- Preview: [https://anti-adhd-git-main-octxxiii.vercel.app](https://anti-adhd-git-main-octxxiii.vercel.app)

#### Deployment Process

1. Push to main branch triggers automatic deployment
2. Preview deployments are created for pull requests
3. Environment variables are managed through Vercel dashboard
4. Build logs and deployment status can be monitored in Vercel dashboard

### License

MIT License

### Contributing

Bug reports and feature suggestions are welcome through [Issues](https://github.com/octxxiii/Anti-ADHD/issues).

### Changelog

- **2025-06-12**: v0.0.1-alpha
  - Initial matrix view implementation
  - Basic Pomodoro timer functionality
  - Task management system setup
  - Team collaboration features
  - Calendar integration

### Contact

For project inquiries or suggestions, please contact [kdyw123@gmail.com](mailto:kdyw123@gmail.com).

---

<a id="korean"></a>
## 한국어

> **당신의 생각에 구조를, 하루에 질서를 부여하는 도구**

### 소개

**ANTI-ADHD**는 아이젠하워 매트릭스를 기반으로 한 할 일 관리 도구입니다. ADHD가 있는 사용자를 위해 특별히 설계되었으며, 중요도와 긴급도에 따라 할 일을 효과적으로 관리하도록 도와드립니다.

### 동기

> **당신의 혼돈 속에서 질서를, 불확실함 속에서 명확함을 찾아드립니다**

ADHD와 함께하는 삶이 얼마나 도전적인지 깊이 이해합니다. 번쩍이는 생각들이 끊임없이 흘러가고, 시작한 일들은 마무리되지 못한 채 방치되며, 시간은 손가락 사이로 모래처럼 빠져나가는 느낌, 이 모든 것이 당신의 일상이 될 수 있다는 것을 알고 있습니다.

이 프로젝트는 단순한 도구 이상의 의미를 담고 있습니다. 이것은 **당신의 잠재력을 온전히 발현시키기 위한 헌신적인 동반자**입니다.

### 우리가 해결하고자 하는 문제

- ⚠️ **할 일의 우선순위 결정의 어려움**
- 🔄 **작업 전환 시 집중력 저하**
- ⏳ **중요한 일을 미루는 경향**
- 📊 **과도한 멀티태스킹**
- ⏰ **시간 관리의 어려움**
- 📝 **일상적인 계획 수립의 어려움**

### 우리의 해결책

아이젠하워 매트릭스를 기반으로 한 이 투두 리스트는 복잡한 세계를 네 가지 명확한 카테고리로 단순화합니다:

| | **긴급함** | **긴급하지 않음** |
|---|---|---|
| **중요함** | 즉시 하기 | 계획 세우기 |
| **중요하지 않음** | 위임하기 | 제거하기 |

이 구분은 산만함으로 고통받는 마음에 평화를 가져다 줍니다.

### 우리의 약속

**우리는 당신이 계획을 세우고, 실행하고, 완성하는 모든 순간을 응원합니다.** 작은 승리의 순간들이 모여 큰 성취가 될 것입니다. 당신의 뇌가 작동하는 독특한 방식을 이해하고, 그것을 강점으로 전환시키기 위해 이 여정을 시작했습니다.

실패하는 날들이 있을 것입니다. 계획이 무너지고, 집중력이 흩어지는 순간들도 있을 것입니다. 하지만 이것은 여정의 일부일 뿐, 당신의 가치를 정의하지 않습니다. 다시 일어나, 매트릭스로 돌아오세요. **우리는 항상 여기 있을 것입니다.**

### 주요 기능

- **📊 매트릭스 뷰**
  - 4분할 작업 관리
  - 드래그 앤 드롭 작업 이동
  - 실시간 작업 업데이트
  - 작업 우선순위 시각화

- **⏱️ 뽀모도로 타이머**
  - 맞춤형 작업/휴식 간격
  - 작업별 시간 추적
  - 휴식 알림
  - 세션 통계

- **📝 작업 관리**
  - 작업 생성 및 편집
  - 우선순위 설정
  - 마감일 지정
  - 작업 분류

- **👥 팀 협업**
  - 실시간 채팅
  - 작업 할당
  - 팀원 역할 관리
  - 활동 추적

- **📅 캘린더 통합**
  - 작업 일정 관리
  - 마감일 관리
  - 팀 가용성 확인
  - 이벤트 알림

### 기술 스택

- **프론트엔드**
  - Next.js 15.2.4
  - React 18.2.0
  - TypeScript
  - Tailwind CSS

- **백엔드**
  - Firebase Authentication
  - Firestore Database
  - Cloud Functions

### 시작하기

1. 저장소 클론
```bash
git clone https://github.com/octxxiii/Anti-ADHD.git
cd Anti-ADHD
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

### 상세 문서

- [기술 설계서](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/TECHNICAL_DESIGN.md)
- [아키텍처 문서](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/ARCHITECTURE.md)
- [API 문서](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/API.md)
- [구현 상세](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/IMPLEMENTATION.md)
- [로드맵](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/ROADMAP.md)
- [배포 가이드](https://github.com/octxxiii/Anti-ADHD/blob/main/docs/DEPLOYMENT.md)

### 개발 정보

- **버전**: 0.0.1 (알파)
- **개발자**: OctXXIII
- **이메일**: kdyw123@gmail.com

### 배포

이 프로젝트는 Vercel에 배포되어 있습니다. 최신 버전은 다음에서 확인할 수 있습니다:
- 프로덕션: [https://anti-adhd.vercel.app](https://anti-adhd.vercel.app)
- 프리뷰: [https://anti-adhd-git-main-octxxiii.vercel.app](https://anti-adhd-git-main-octxxiii.vercel.app)

#### 배포 프로세스

1. main 브랜치 푸시 시 자동 배포
2. Pull Request에 대한 프리뷰 배포 생성
3. 환경 변수는 Vercel 대시보드에서 관리
4. 빌드 로그와 배포 상태는 Vercel 대시보드에서 모니터링

### 라이선스

MIT License

### 기여하기

버그 리포트나 기능 제안은 [Issues](https://github.com/octxxiii/Anti-ADHD/issues)를 통해 환영합니다.

### 업데이트 내역

- **2025-06-12**: v0.0.1-alpha
  - 매트릭스 뷰 초기 구현
  - 기본 뽀모도로 타이머 기능
  - 작업 관리 시스템 구축
  - 팀 협업 기능 추가
  - 캘린더 통합 구현

### 연락처

프로젝트에 대한 문의나 제안이 있으시면 [kdyw123@gmail.com](mailto:kdyw123@gmail.com)으로 연락주세요.

---

<p align="center">
  <b>ANTI-ADHD</b> — 당신의 생각에 구조를, 하루에 질서를 부여하는 도구
</p>