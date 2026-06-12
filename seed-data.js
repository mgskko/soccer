/* ============================================================
   2026 월드컵 시드 데이터 (실제 조 추첨 결과 반영)
   ─ Firebase 미설정이거나 DB가 비어 있을 때 이 데이터를 보여줍니다.
   ─ Firebase 연결 후에는 관리자 로그인 → "초기 데이터 업로드" 버튼으로
     이 내용을 DB에 한 번 심은 뒤, 사이트에서 직접 수정하면 됩니다.
   ============================================================ */

const SEED_SITE = {
  title: "2026 월드컵 예측",
  owner: "고명석",
  subtitle: "승무패 · 스코어 · 키플레이어 픽 아카이브",
};

/* 조별 팀 (2025.12.05 워싱턴 D.C. 추첨 확정, 각 조 풀리그 6경기 순서 포함) */
const SEED_GROUP_TEAMS = {
  A: [["멕시코","🇲🇽"],["남아공","🇿🇦"],["한국","🇰🇷"],["체코","🇨🇿"]],
  B: [["캐나다","🇨🇦"],["보스니아","🇧🇦"],["카타르","🇶🇦"],["스위스","🇨🇭"]],
  C: [["브라질","🇧🇷"],["모로코","🇲🇦"],["아이티","🇭🇹"],["스코틀랜드","🏴󠁧󠁢󠁳󠁣󠁴󠁿"]],
  D: [["미국","🇺🇸"],["파라과이","🇵🇾"],["호주","🇦🇺"],["튀르키예","🇹🇷"]],
  E: [["독일","🇩🇪"],["퀴라소","🇨🇼"],["코트디부아르","🇨🇮"],["에콰도르","🇪🇨"]],
  F: [["네덜란드","🇳🇱"],["일본","🇯🇵"],["스웨덴","🇸🇪"],["튀니지","🇹🇳"]],
  G: [["벨기에","🇧🇪"],["이집트","🇪🇬"],["이란","🇮🇷"],["뉴질랜드","🇳🇿"]],
  H: [["스페인","🇪🇸"],["카보베르데","🇨🇻"],["사우디","🇸🇦"],["우루과이","🇺🇾"]],
  I: [["프랑스","🇫🇷"],["세네갈","🇸🇳"],["이라크","🇮🇶"],["노르웨이","🇳🇴"]],
  J: [["아르헨티나","🇦🇷"],["알제리","🇩🇿"],["오스트리아","🇦🇹"],["요르단","🇯🇴"]],
  K: [["포르투갈","🇵🇹"],["DR콩고","🇨🇩"],["우즈베키스탄","🇺🇿"],["콜롬비아","🇨🇴"]],
  L: [["잉글랜드","🏴󠁧󠁢󠁥󠁮󠁧󠁿"],["크로아티아","🇭🇷"],["가나","🇬🇭"],["파나마","🇵🇦"]],
};

/* FIFA 조별리그 경기 순서 패턴: 팀 [1,2,3,4] 기준 */
const MATCH_PATTERN = [[0,1],[2,3],[3,1],[0,2],[3,0],[1,2]];

/* 미리 입력해 둔 예측/결과 (카톡방 기록 기반 A조) */
const SEED_OVERRIDES = {
  groups: {
    A: {
      standings: [
        { team: "멕시코", record: "3승" },
        { team: "체코",   record: "2승 1패" },
        { team: "한국",   record: "1승 2패" },
        { team: "남아공", record: "3패" },
      ],
      // index = 경기 순서 (0: 멕시코-남아공, 1: 한국-체코, 2: 체코-남아공,
      //                    3: 멕시코-한국, 4: 체코-멕시코, 5: 남아공-한국)
      matches: {
        0: { pick: "멕시코", betType: "정배", actual: "2:0" },
        1: { pick: "한국",   betType: "정배", actual: "1:3" },
        2: { betType: "정배", actual: "2:0" },
        3: { betType: "정배", actual: "3:2" },
        4: { betType: "정배", actual: "0:2" },
        5: { betType: "정배", actual: "0:2" },
      },
      keyPlayers: [
        { team: "한국",   players: [{ name: "오현규" }, { name: "양현준", note: "조카체인저" }] },
        { team: "체코",   players: [{ name: "슐츠", note: "리옹" }] },
        { team: "멕시코", players: [{ name: "모라", note: "08년생" }, { name: "키뇨네스", note: "사우디리그" }] },
        { team: "남아공", players: [{ name: "아폴리스", note: "7번" }, { name: "윌리엄스", note: "키퍼" }] },
      ],
      specials: [
        { label: "한국 첫 골", pick: "이강인", actual: "이강인" },
      ],
    },
  },
};

/* 토너먼트 라운드 골격 (FIFA 공식 매치 번호 73~104) */
const SEED_ROUNDS = [
  { key: "r32",   name: "32강",    count: 16, start: 73  },
  { key: "r16",   name: "16강",    count: 8,  start: 89  },
  { key: "qf",    name: "8강",     count: 4,  start: 97  },
  { key: "sf",    name: "4강",     count: 2,  start: 101 },
  { key: "third", name: "3·4위전", count: 1,  start: 103 },
  { key: "final", name: "결승",    count: 1,  start: 104 },
];

/* 시드 상태 객체 생성 */
function buildSeedState() {
  const groups = {};
  Object.keys(SEED_GROUP_TEAMS).forEach((g) => {
    const arr = SEED_GROUP_TEAMS[g];
    const teams = {};
    arr.forEach(([n, f]) => (teams[n] = f));
    const ov = (SEED_OVERRIDES.groups || {})[g] || {};
    const matches = MATCH_PATTERN.map(([h, a], i) => {
      const o = (ov.matches || {})[i] || {};
      return {
        home: arr[h][0], away: arr[a][0],
        pick: o.pick || "", pickScore: o.pickScore || "",
        betType: o.betType || "", actual: o.actual || "",
      };
    });
    groups[g] = {
      teams,
      standings: ov.standings || arr.map(([n]) => ({ team: n, record: "" })),
      matches,
      keyPlayers: ov.keyPlayers || arr.map(([n]) => ({ team: n, players: [] })),
      specials: ov.specials || [],
    };
  });

  const bracket = {};
  SEED_ROUNDS.forEach((r) => {
    bracket[r.key] = Array.from({ length: r.count }, (_, i) => ({
      no: r.start + i, label: "",
      team1: "", team2: "", flag1: "", flag2: "",
      pick: "", pickScore: "", betType: "", actual: "", winner: "",
    }));
  });

  return {
    site: SEED_SITE,
    groups,
    bracket,
    bracketSpecials: [
      { label: "우승팀",   pick: "", actual: "" },
      { label: "준우승",   pick: "", actual: "" },
      { label: "득점왕",   pick: "", actual: "" },
      { label: "골든볼",   pick: "", actual: "" },
    ],
    updated: "2026-06-12",
  };
}
