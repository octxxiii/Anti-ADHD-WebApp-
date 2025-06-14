# 📚 AntiADHD Documentation

This directory contains all documentation for the AntiADHD project. AntiADHD is a productivity management tool for users with ADHD.

## 📑 Table of Contents
- [Features](#features)
- [Live Demo](#live-demo)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Documentation](#documentation)
- [Security](#security)
- [Contribution](#contribution)
- [Changelog](#changelog)
- [License](#license)
- [Contact](#contact)

---

# 📚 AntiADHD 문서

이 디렉토리는 AntiADHD 프로젝트의 모든 문서를 포함하고 있습니다. AntiADHD는 ADHD를 가진 사용자들을 위한 생산성 관리 도구입니다.

## 📑 목차
- [기술 설계서](#기술-설계서)
- [아키텍처 문서](#아키텍처-문서)
- [API 문서](#api-문서)
- [구현 상세](#구현-상세)
- [로드맵](#로드맵)
- [배포 가이드](#배포-가이드)
- [보안 정책](#보안-정책)
- [기여 가이드](#기여-가이드)
- [변경 이력](#변경-이력)
- [문서 업데이트](#🔄-문서-업데이트)
- [문서 작성 가이드라인](#📝-문서-작성-가이드라인)
- [문서 목적](#🎯-문서-목적)
- [보안](#🔒-보안)
- [최종 업데이트](#📅-최종-업데이트)

## 📑 문서 구조

### 1. [기술 설계서](TECHNICAL_DESIGN.md)
- 기술 스택 상세 (Next.js 15.2.4, React 19.0.0, TypeScript)
- 시스템 아키텍처 (Firebase 기반)
- 데이터베이스 설계 (Firestore)
- API 설계 (REST + WebSocket)
- 보안 설계 (Firebase Auth)
- 성능 최적화 전략
- WBS (Work Breakdown Structure)

### 2. [아키텍처 문서](ARCHITECTURE.md)
- 시스템 구조와 다이어그램
- 컴포넌트 구조와 계층
- 상태 관리 구조 (Zustand)
- 라우팅 구조 (Next.js App Router)
- 성능 최적화 전략
- 보안 구조

### 3. [API 문서](API.md)
- REST API 엔드포인트
- WebSocket API (실시간 동기화)
- 요청/응답 형식
- 인증 방식 (Firebase Auth)
- 에러 처리

### 4. [구현 상세](IMPLEMENTATION.md)
- 데이터 구조 상세
- 실시간 동기화 구현
- UI/UX 구현 상세
- 보안 & 권한 관리
- 성능 최적화

### 5. [로드맵](ROADMAP.md)
- 개발 일정
- 기능 우선순위
- 마일스톤
- 향후 계획
- 리스크 관리

### 6. [배포 가이드](DEPLOYMENT.md)
- Vercel 배포 준비
- 배포 프로세스
- 구글 애드센스 통합
- SEO 최적화
- 모니터링 및 유지보수

### 7. [보안 정책](SECURITY.md)
- 취약점 보고 절차
- 보안 정책
- 데이터 보호
- 개인정보 처리방침
- 법적 고지

### 8. [기여 가이드](CONTRIBUTING.md)
- 개발 환경 설정
- 코드 컨벤션
- PR 프로세스
- 테스트 가이드라인
- 문서화 가이드라인

### 9. [변경 이력](CHANGELOG.md)
- 버전별 변경사항
- 주요 기능 추가
- 버그 수정
- 성능 개선

## 🔄 문서 업데이트

문서는 프로젝트의 변경사항에 따라 지속적으로 업데이트됩니다. 주요 변경사항이 있을 때마다 관련 문서를 업데이트해주세요.

## 📝 문서 작성 가이드라인

1. **마크다운 형식**
   - 모든 문서는 마크다운(.md) 형식으로 작성
   - 이모지를 활용한 섹션 구분
   - 코드 블록은 언어 지정

2. **구조화**
   - 명확한 제목과 부제목
   - 목차 포함
   - 체크리스트 활용

3. **코드 예시**
   - TypeScript/JavaScript 코드는 언어 지정
   - 환경 변수는 예시 값 사용
   - 주석 포함

4. **이미지**
   - 필요한 경우 이미지 첨부
   - 이미지는 `docs/assets` 디렉토리에 저장
   - 다이어그램은 Mermaid 형식 사용

## 🎯 문서 목적

이 문서들은 다음을 목적으로 합니다:
- 프로젝트의 기술적 구조 이해
- 개발 프로세스 표준화
- 유지보수 용이성 확보
- 새로운 팀원 온보딩 지원
- 프로젝트 진행 상황 추적

## 🔒 보안

모든 문서는 프로젝트의 보안 정책을 준수해야 합니다. 민감한 정보는 반드시 환경 변수나 보안 저장소를 통해 관리해주세요.

## 📅 최종 업데이트

마지막 업데이트: 2025-06-13
