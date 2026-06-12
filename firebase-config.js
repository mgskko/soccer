/* ============================================================
   Firebase 설정 — README.md의 설정 가이드를 따라 값을 채우세요.
   (Firebase 콘솔 → 프로젝트 설정 → 일반 → 내 앱 → SDK 구성)
   값을 채우기 전까지 사이트는 "읽기 전용 모드"(seed 데이터)로 동작합니다.
   ============================================================ */

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCsONyA6-yf6gTeN1QEfERfucHzeku3o80",
  authDomain: "soccer-40478.firebaseapp.com",
  projectId: "soccer-40478",
  storageBucket: "soccer-40478.firebasestorage.app",
  messagingSenderId: "649217857843",
  appId: "1:649217857843:web:b0b4e172a1d4fd6cf30646",
  measurementId: "G-7PB8HZH3JQ"
};

/* 수정 권한을 가질 구글 계정 이메일 (본인 지메일로 교체)
   ※ 실제 차단은 Firestore 보안 규칙이 담당. 여기는 UI 표시용. */
const ADMIN_EMAILS = ["msk7240@hanmail.net"];
