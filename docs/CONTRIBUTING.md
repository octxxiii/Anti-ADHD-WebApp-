# 🤝 기여 가이드라인

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.0.0 이상
- pnpm 8.0.0 이상
- Git

### 초기 설정
```bash
# 저장소 클론
git clone https://github.com/yourusername/antiadhd.git
cd antiadhd

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 코드 컨벤션

### TypeScript
- 명시적 타입 선언 사용
- `any` 타입 사용 지양
- 인터페이스는 `I` 접두사 사용
- 타입은 `T` 접두사 사용

### React
- 함수형 컴포넌트 사용
- Props 인터페이스 정의
- 컴포넌트 파일명은 PascalCase
- 훅은 `use` 접두사 사용

### CSS
- Tailwind CSS 클래스는 가독성을 위해 그룹화
- 커스텀 스타일은 `@apply` 사용
- 반응형 디자인은 모바일 퍼스트

## PR 프로세스

1. 이슈 생성
   - 기능 요청
   - 버그 리포트
   - 문서 개선

2. 브랜치 생성
   - `feature/기능명`
   - `fix/버그명`
   - `docs/문서명`

3. PR 작성
   - 이슈 번호 연결
   - 변경사항 설명
   - 스크린샷 첨부 (UI 변경시)

4. 코드 리뷰
   - 최소 1명의 승인 필요
   - CI/CD 통과 확인

## 테스트 작성

### 단위 테스트
```typescript
describe('Component', () => {
  it('should render correctly', () => {
    // 테스트 코드
  });
});
```

### E2E 테스트
```typescript
describe('Feature', () => {
  it('should work end-to-end', () => {
    // 테스트 코드
  });
});
```

## 문서화

### 주석
- 복잡한 로직에 대한 설명
- API 엔드포인트 설명
- 타입 정의 설명

### README
- 컴포넌트 사용법
- Props 설명
- 예제 코드

## 커밋 메시지

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 타입
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅
- refactor: 코드 리팩토링
- test: 테스트 코드
- chore: 빌드 업무

## 문제 해결

### 일반적인 이슈
1. `pnpm install` 실패
   - node_modules 삭제
   - pnpm store 정리
   - 재설치

2. 빌드 실패
   - .next 디렉토리 삭제
   - 타입 체크
   - 의존성 확인

### 도움 요청
- 이슈 템플릿 사용
- 재현 방법 상세 설명
- 에러 메시지 첨부
- 환경 정보 제공 