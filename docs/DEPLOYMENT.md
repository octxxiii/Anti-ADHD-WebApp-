# 🚀 배포 가이드

## 1. Vercel 배포 준비

### 1.1 사전 요구사항
- [ ] Vercel 계정 생성
- [ ] GitHub 저장소 연결
- [ ] 환경 변수 설정
  ```env
  # Firebase
  NEXT_PUBLIC_FIREBASE_API_KEY=
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
  NEXT_PUBLIC_FIREBASE_APP_ID=

  # Google Analytics
  NEXT_PUBLIC_GA_ID=

  # Google AdSense
  NEXT_PUBLIC_ADSENSE_CLIENT_ID=
  ```

### 1.2 배포 설정
1. **프로젝트 설정**
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

2. **도메인 설정**
   - [ ] 커스텀 도메인 연결
   - [ ] SSL 인증서 발급
   - [ ] DNS 레코드 설정

3. **환경 설정**
   - [ ] Production 환경 변수
   - [ ] Preview 환경 변수
   - [ ] Development 환경 변수

## 2. 배포 프로세스

### 2.1 자동 배포 설정
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm build
```

### 2.2 배포 단계
1. **개발 환경**
   ```bash
   pnpm dev
   ```

2. **프로덕션 빌드**
   ```bash
   pnpm build
   ```

3. **로컬 테스트**
   ```bash
   pnpm start
   ```

4. **Vercel 배포**
   - GitHub 저장소 연결
   - 자동 배포 활성화
   - 환경 변수 설정

## 3. 구글 애드센스 통합

### 3.1 사전 준비
- [ ] 구글 애드센스 계정 생성
- [ ] 사이트 등록
- [ ] 사이트 검증
- [ ] 광고 단위 생성

### 3.2 구현 단계
1. **스크립트 추가**
   ```html
   <!-- app/layout.tsx -->
   <head>
     <script
       async
       src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
       crossOrigin="anonymous"
     />
   </head>
   ```

2. **광고 컴포넌트**
   ```typescript
   // components/ads/AdUnit.tsx
   'use client'
   
   import { useEffect } from 'react'
   
   export const AdUnit = ({ slot, format = 'auto' }) => {
     useEffect(() => {
       try {
         ;(window.adsbygoogle = window.adsbygoogle || []).push({})
       } catch (err) {
         console.error('AdSense error:', err)
       }
     }, [])
   
     return (
       <ins
         className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot={slot}
         data-ad-format={format}
         data-full-width-responsive="true"
       />
     )
   }
   ```

3. **광고 배치**
   ```typescript
   // app/page.tsx
   import { AdUnit } from '@/components/ads/AdUnit'
   
   export default function Home() {
     return (
       <div>
         <header>
           <AdUnit slot="header-ad" />
         </header>
         <main>
           <AdUnit slot="content-ad" />
         </main>
         <footer>
           <AdUnit slot="footer-ad" />
         </footer>
       </div>
     )
   }
   ```

### 3.3 모니터링
- [ ] 애드센스 대시보드 연동
- [ ] 수익 추적
- [ ] 광고 성과 분석
- [ ] 사용자 행동 분석

## 4. SEO 최적화

### 4.1 메타데이터 설정
```typescript
// app/layout.tsx
export const metadata = {
  title: 'AntiADHD - 생산성 관리 도구',
  description: 'ADHD를 가진 사람들을 위한 생산성 관리 도구',
  keywords: 'ADHD, 생산성, 뽀모도로, 매트릭스, 캘린더',
  openGraph: {
    title: 'AntiADHD - 생산성 관리 도구',
    description: 'ADHD를 가진 사람들을 위한 생산성 관리 도구',
    images: ['/og-image.png'],
  },
}
```

### 4.2 사이트맵 생성
```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://antiadhd.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://antiadhd.com/matrix',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // ... 추가 URL
  ]
}
```

## 5. 모니터링 및 유지보수

### 5.1 성능 모니터링
- [ ] Vercel Analytics 설정
- [ ] Google Analytics 설정
- [ ] 에러 트래킹 설정

### 5.2 백업 전략
- [ ] Firebase 데이터 백업
- [ ] 환경 변수 백업
- [ ] 코드 백업

### 5.3 유지보수 계획
- [ ] 정기적인 의존성 업데이트
- [ ] 성능 최적화
- [ ] 보안 업데이트
- [ ] 사용자 피드백 수집 