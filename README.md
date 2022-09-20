This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 1.실행방법

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## 2. 프로젝트 구조

  해당 유투브 API Project는 총 3개의 화면으로 이루어져 있습니다.
    메인화면(index.tsx)
    보관함(wishlist.tsx)
    검색화면(search.tsx)

   

  - src 폴더 내의 구성입니다.
    src
    ├── api
    │   └── index.ts(유튜브 API 공통화 모듈)
    ├── components(각 화면별 컴포넌트)
    │   ├── common
    │   │   └── Header.tsx
    │   ├── video
    │   │   ├── PlayListItem.tsx
    │   │   └── Player.tsx
    │   └── wishlist
    │       ├── Header.tsx
    │       ├── WishList.tsx
    │       └── WishListItem.tsx
    ├── hooks
    ├── interfaces
    │   └── ContentInfo.ts(유튜브 API List 타입 정리)
    ├── pages
    │   ├── _app.tsx
    │   ├── index.tsx
    │   ├── search.tsx
    │   └── wishlist.tsx
    ├── react-app-env.d.ts
    ├── store
    │   ├── index.ts(Reducer을 합쳐주는 파일)
    │   └── modules(Redux-Toolkit Reducer 및 action 파일)
    │       ├── contentList.ts
    │       ├── searchList.ts
    │       └── wishList.ts
    ├── styles(css를 통합하여 사용하지 않고 각 화면별로 모듈로 나눠서 사용)
    │   ├── Header.module.css
    │   ├── Home.module.css
    │   ├── Playlist.module.css
    │   ├── Search.module.css
    │   ├── Video.module.css
    │   ├── Wishlist.module.css
    │   └── globals.css
    └── utils
        ├── common.ts
        └── wishStorage.ts

## 3. 제약 조건 외 라이브러리를 선택한 이유

  - 환경변수 처리(env-cmd)
    - 해당 라이브러리를 사용을 하면 process.env 처리를 보다 쉽게 사용 가능합니다.

  - lodash(배열 및 객체 정보 가공 라이브러리)
    - 기존 타입스크립트에서 제공하는 .map, .filter, etc 외 추가적인 기능을 제공하여서 사용했습니다.

  - react-youtube
    - 해당 라이브러리가 YouTube API 안에 있는 videoId를 인자로 주면 바로 iFrame 상으로 동영상이 재생이 되며
    - 동영상 시작, 종료 된 콜백을 받을수 있어서 사용 하였습니다.
    - 또한 종료 콜백을 이용하여 셔플 재생 및 순차 재생 기능을 보다 간편하게 구현하였습니다.

## 4. 구현 & 미구현 항목
  
  - 구현 항목
    1. 메인화면
      - 검색결과의 첫번째 비디오 자동 재생 처리 및 비디오 제목, 채널 이름 등 UI 구성 구현
      - 검색 결과 리스트 UI 및 영상이 끝날 때 순차 재생 및 셔플 재생 구현 및 모두 재생시 멈춤 처리 구현
      - 상단 검색 영역에서 키워드를 타이핑 한 후 키보드 'Enter'을 누를시 검색화면으로 이동 구현
      - 찜 되어 있는 상태 및 해제 기능 구현
      - 만약 다른화면을 간 후 다시 돌아와도 내가 최근에 본 영상부터 재생되는 기능 추가(새로고침은 미구현)
    
    2. 검색화면
      - YouTube API를 불러올동안 로딩중 표시 및 해당 키워드의 동영상이 미 존재 시 검색결과 없음 화면 구현
      - YouTube API에서 데이터를 불러오는데 성공 할 때 메인화면 으로 이동하여 첫번째 비디오 재생 처리 구현

    3. 찜 목록
      - 찜 목록 UI 구성 완료
      - 최초 진입시 첫번째 찜 목록 비디오 자동 재생 처리 및 비디오 제목, 채널 이름 등 UI 구성 구현
      - 영상이 끝날때 순차 재생 및 셔플 재생 기능 구현 및 모두 재생시 멈춤 처리 구현
      - 하단에 찜한 목록 전체 노출후 찜 해제시 목록에서 제외 처리
      - 메인화면과 동일하게 만약 다른화면을 간 후 다시 돌아와도 내가 최근에 본 영상부터 재생되는 기능 추가(새로고침은 미구현)

  - 미 구현 항목
    1. 메인화면
      - 검색결과 리스트에서 찜목록 및 일반 목록에 있는 비디오 정렬 기능

## 5. 우대사항 대응 내역

  - 대응 항목
    1. API 최적화(중복 호출 방지)
    2. 환경변수 관리(YouTube API Url 주소 및 Key 값 환경변수 처리)
    3. 새로고침 시 찜 항목 유지

## 6. 회고 또는 느낀점
  - 우선 저는 개발자일을 시작한지 약 2년 정도 되었으나 제가 일했던 필드에서는 주로 [React], [Mobx], [TypeScript]로만 개발을 하여서
  - [Redux] 및 [Next.js]는 거의 접하지 못한 상태였습니다. 하지만 이번 과제를 임하면서 [Redux] 및 [Next.js]에 대하여 많이 알게 되었습니다.
  - 과제를 하면서 단순히 과제라고 생각을 못하였고 저만의 사이드 프로젝트를 준비하는 마음가짐으로 일하였습니다.
  - 접하지 못한 상태에서 과제를 수행하다보니 시간적으로 부족하여 스타일 부분에서 많이 투자를 못하였습니다.
  - 추후 보완을 통해 반응형 및 시맨틱 마크업 까지 구현 해볼 생각입니다.
  - 잘 부탁 드립니다. 감사합니다.