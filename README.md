# ⚽ 2026 월드컵 예측 아카이브

12개 조 전체(A~L) + 32강~결승 토너먼트의 승무패 · 스코어 · 키플레이어 픽을 기록하고,
**구글 로그인한 관리자(나)만 사이트에서 직접 입력/수정**할 수 있는 모바일 웹.
친구들은 링크로 보기만 가능.

## 파일 구성
| 파일 | 역할 |
|---|---|
| `index.html` | 사이트 본체 (수정 불필요) |
| `seed-data.js` | 실제 2026 조편성 12개 조 + A조 픽이 담긴 초기 데이터 |
| `firebase-config.js` | **여기만 채우면 됨** — Firebase 키 + 관리자 이메일 |

## 1단계 — 일단 배포 (Firebase 없이도 동작)
1. GitHub 새 레포 생성 (예: `worldcup-2026`)
2. 파일 3개 업로드 → Settings → Pages → Branch: main / (root)
3. `https://mgskko.github.io/worldcup-2026/` 접속 확인

이 상태에서는 "미리보기 모드"로 seed 데이터만 보임. 수정하려면 2단계 진행.

## 2단계 — Firebase 연결 (구글 로그인 + 편집, 약 10분)
1. https://console.firebase.google.com → 프로젝트 추가 (이름 자유, 애널리틱스 끔)
2. **Authentication** → 시작하기 → 로그인 방법 → **Google** 사용 설정
3. Authentication → 설정 → **승인된 도메인**에 `mgskko.github.io` 추가
4. **Firestore Database** → 데이터베이스 만들기 → 프로덕션 모드
5. Firestore → **규칙** 탭에 아래 붙여넣기 (이메일은 본인 지메일로):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /app/{doc} {
         allow read: if true;
         allow write: if request.auth != null
                      && request.auth.token.email == "본인이메일@gmail.com";
       }
     }
   }
   ```
6. 프로젝트 설정(톱니) → 일반 → 내 앱 → **웹 앱 추가(</>)** → SDK 구성 값을
   `firebase-config.js`의 `FIREBASE_CONFIG`에 복사
7. 같은 파일의 `ADMIN_EMAILS`에 본인 지메일 입력
8. 커밋 & 푸시

## 사용 흐름
1. 사이트 접속 → 우상단 **구글 로그인**
2. 첫 로그인 시 "시드 데이터 업로드" 확인 → 확인 누르면 12개 조 + A조 픽이 DB에 저장
3. **✏️ 수정 모드** → 픽/정배·역배/스코어/키플레이어/결과 입력 → **💾 저장**
4. 친구들은 같은 링크에서 실시간으로 확인 (로그인 없이 보기 전용)

## 입력 팁
- 결과만 `1:3` 형식으로 넣으면 적중/빗나감/퍼펙트 도장이 자동으로 찍힘
- 키플레이어는 `오현규, 양현준(조카체인저)` 처럼 쉼표 구분, 괄호는 메모
- 토너먼트는 팀 확정될 때마다 `🇰🇷 한국` 형식으로 입력 (국기 이모지 + 이름)
- 승부차기 경기는 "실제 승자" 칸에 이긴 팀 이름을 따로 적으면 정확히 판정됨
- 결승 탭 맨 아래에 우승팀/득점왕/골든볼 스페셜 픽 있음

## 주의
- 카카오톡 인앱 브라우저에서는 구글 로그인 팝업이 막힐 수 있음 →
  우하단 ⋯ 메뉴에서 "다른 브라우저로 열기" 후 로그인 (친구들은 보기만 하니 상관없음)
- `firebase-config.js`의 apiKey는 공개되어도 되는 값 (보안은 Firestore 규칙이 담당)
