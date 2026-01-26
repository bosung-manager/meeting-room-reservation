# 미팅룸 예약 시스템

회의실 예약 및 관리를 위한 Next.js 애플리케이션입니다.

## 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**:
  - **Dev (Mock)**: Local JSON File (`local-db.json`)
  - **Prod**: Neon (PostgreSQL) via Prisma

## 시작하기

### 1. 개발 환경 (Mock DB)
별도의 DB 설정 없이 바로 실행 가능합니다. 로컬 JSON 파일을 DB처럼 사용합니다.

```bash
npm install
npm run dev
```
접속: [http://localhost:3000](http://localhost:3000) (현재 설정된 포트는 3001일 수 있음)

### 2. 프로덕션 배포 (Neon + Vercel)

1. **Neon DB 생성**: Neon 콘솔에서 프로젝트 생성 후 Connection String 복사.
2. **환경 변수 설정**: Vercel 프로젝트 설정에서 다음 변수 추가.

```env
DATABASE_URL="postgres://user:pass@host:5432/neondb?sslmode=require"
NEXT_PUBLIC_USE_MOCK_DB="false"
```

3. **Prisma 배포**:
빌드 과정에서 자동으로 마이그레이션이 적용되도록 `package.json`의 build 스크립트 확인 또는 Vercel Build Command 수정.

```bash
npx prisma migrate deploy
```

## 관리자 기능
- 접속 경로: `/admin/login`
- 기본 비밀번호: `00001`
- 기능: 회의실 추가/삭제, 예약 강제 취소(구현 예정)
