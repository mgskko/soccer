/* ============================================================
   Firebase 설정 — README.md의 설정 가이드를 따라 값을 채우세요.
   (Firebase 콘솔 → 프로젝트 설정 → 일반 → 내 앱 → SDK 구성)
   값을 채우기 전까지 사이트는 "읽기 전용 모드"(seed 데이터)로 동작합니다.
   ============================================================ */

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

/* 수정 권한을 가질 구글 계정 이메일 (본인 지메일로 교체)
   ※ 실제 차단은 Firestore 보안 규칙이 담당. 여기는 UI 표시용. */
const ADMIN_EMAILS = ["your-email@gmail.com"];
