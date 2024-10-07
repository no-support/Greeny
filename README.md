# 🌿<font color="#20604F">Greeny</font>

![Greeny_banner](https://github.com/user-attachments/assets/33562580-c941-4a1e-8210-7cc625289c4e)

<br/>

## 팀 소개

|                                                      **이경민(팀장)**                                                      |                                                             **노지원**                                                              |                                                  **신민철**                                                   |
| :------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
| <img width="180" alt="baduck" src="https://github.com/user-attachments/assets/2134800a-67c0-4a93-9bf9-5abfe73279df"> | <img width="180" alt="no_supply_profile_img" src="https://github.com/user-attachments/assets/bad008fa-6f51-48b8-89b0-144881052996"> | <img width="180" alt="mincheol.shin_profile_img" src="https://avatars.githubusercontent.com/u/110030523?v=4"> |
|                                      [🔗 kyungmim](https://github.com/kyungmim)                                      |                                           [🔗 no-support](https://github.com/no-support)                                            |                             [🔗 shin-mincheol](https://github.com/shin-mincheol)                              |

<br/>

## 목차

<span style="font-size: 1.2em;">**1.** [ 프로젝트 설명 ](#1-프로젝트-설명)</span>  
<span style="font-size: 1.2em;">**2.** [ 기술 및 개발환경 ](#2-기술-및-개발환경)</span>  
<span style="font-size: 1.2em;">**3.** [ 핵심 기능 ](#3-핵심-기능)</span>  
<span style="font-size: 1.2em;">**4.** [ 프로젝트 구조 ](#4-프로젝트-구조)</span>  
<span style="font-size: 1.2em;">**5.** [ 역할 분담 ](#5-역할-분담)</span>  
<span style="font-size: 1.2em;">**6.** [ 플로우 차트 ](#6-플로우-차트)</span>  
<span style="font-size: 1.2em;">**7.** [ 트러블 슈팅 ](#7-트러블-슈팅)</span>  
<span style="font-size: 1.2em;">**8.** [ 리팩터링 계획 ](#8-리팩터링-계획)</span>

<br/>

## 소개 및 개요

- **프로젝트 기간** : 2024.07.29 ~ 2024.08.27
- **배포 URL** : [🌿Greeny](https://greeny.vercel.app/)
- **테스트 계정**
  ```
    ID: p1@plant.com
    PW: 11111111
  ```

📑 **프로젝트 관련 자료**
👉 🌿[피그마 시안 디자인](https://www.figma.com/design/wScllow4nEUlwP5rT813CS/Greeny?node-id=54-1972&t=oYjGGnHR8T2MGjmm-1)
👉 🌿[요구사항 명세서](https://docs.google.com/spreadsheets/d/1twNWiRhqbNU6QIXePoJyC9YdHr4K_NChuiAptxXQFPY/edit?usp=sharing)
👉 🌿[팀 노션페이지](https://meadow-hydrogen-e0d.notion.site/b0b2b9e4d430483bb1988166a86518be?pvs=4)

<br/>

## 1. 프로젝트 설명

🌿**Greeny**는 **내 식물의 성장 기록과 다른 식물의 여정을 함께하는, 식물 애호가들을 위한 소셜 네트워크**입니다.

> 식물 백과를 통해 다양한 **식물들의 키우는 방법과 정보**를 손쉽게 확인할 수 있습니다. 식물을 등록하여 여러분의 식물을 자랑해주세요. <br/>
> **식물 일기**를 작성해 소중한 기억들을 기록하고, 추억들을 **다른 식집사분들과 나누어보세요.** <br/>
> 또한, 커뮤니티를 통해 **다른 식집사분들과 정보를 공유**하며 더 많은 가드닝 팁과 노하우를 얻어보세요!

<br/>

## 2. 기술 및 개발 환경

<table class="tg">
<tbody>
   <tr>
    <td class="tg-0pky">개발 환경<br></td>
    <td class="tg-0pky">[FrontEnd] Next.js, Sass<br>[BackEnd] 제공되는 API 사용 <a href='https://api.fesp.shop/apidocs/#/'>🔗 제공된 API </a></td>
  </tr>
  <tr>
    <td class="tg-0pky">버전 및 이슈 관리</td>
    <td class="tg-0pky">Git / GitHub / Notion</td>
  </tr>
  <tr>
    <td class="tg-0pky">컨벤션</td>
    <td class="tg-0pky">Eslint / Prettier / GitHub Issue, PR Template</td>
  </tr>
  <tr>
    <td class="tg-0pky">프로젝트 관리</td>
    <td class="tg-0pky">GitHub Pull Requests</td>
  </tr>
  <tr>
    <td class="tg-0pky">커뮤니케이션</td>
    <td class="tg-0pky">Notion / Discord</td>
  </tr>
  <tr>
    <td class="tg-0pky">배포</td>
    <td class="tg-0pky">Vercel</td>
  </tr>
</tbody>
</table>

<br />

### [라이브러리 사용 이유]

<table class="tg">
<tbody>
   <tr>
    <td class="tg-0pky">React Calendar / React Datepicker</td>
    <td class="tg-0pky">비동기 데이터 요청과 관리를 간단하고 효율적으로 처리하기 위해 사용</td>
  </tr>
  <tr>
    <td class="tg-0pky">React Hook Form</td>
    <td class="tg-0pky">HTTP 요청과 응답 처리를 보다 단순하고 직관적으로 처리하기 위해 사용</td>
  </tr>
  <tr>
    <td class="tg-0pky">Husky</td>
    <td class="tg-0pky">일단은 기능 구현 위주로 개발하는 것을 원칙으로 했지만, 추후 어느 정도 기능 구현이 되어 리팩터링 단계 때 테스트 코드를 작성하게 된다면, 허스키를 통해 커밋 전 테스트를 실행해볼 수 있기 때문에 사용을 고려해보다가, vercel에 배포 전 미리 빌드 테스트 또한 허스키를 사용해서 해볼 수 있어서 선정</td>
  </tr>
  <tr>
    <td class="tg-0pky">Sass</td>
    <td class="tg-0pky">css-in-js 방식과 비교해 스타일과 마크업의 분리를 통해 가독성이 좋음. 성능 또한 css-in-js 방식은 런타임에 스타일을 선택하는 반면 scss는 사전 컴파일되어 최종 css 파일로 변환되므로 브라우저의 성능 부담이 줄어듦.</td>
  </tr>
  <tr>
    <td class="tg-0pky">Swiper</td>
    <td class="tg-0pky">meta 태그와 페이지별 타이틀을 위해 사용</td>
  </tr>
</tbody>
</table>

<br />

## 3. 핵심 기능

### 홈

배너, 추천 식물, 다른 식집사분들의 일기, 게시글들을 한 눈에 확인해 보세요.
|홈 메인|
|:-:|
|<img width="240px;" src="https://github.com/user-attachments/assets/0355f4ef-d94c-49ba-8a9e-910badad726d">|

### 식물 백과

식물 백과를 통해 다양한 식물의 정보들과 가드닝 정보를 확인할 수 있습니다.
|식물 백과|
|:-:|
|<img width="240px;" src="https://github.com/user-attachments/assets/e649c9d1-a8aa-4dcb-8c11-516dddda710e">|

### 마이 페이지

내 식물과 게시글들을 확인할 수 있습니다. <br/>
팔로우한 식물과 식집사를 관리할 수 있고 좋아요한 게시글들을 확인할 수 있습니다.
|팔로우한 식물 및 좋아요한 게시글 확인|식물 팔로우 취소|
|:-:|:-:|
|<img width="240px;" src="https://github.com/user-attachments/assets/6ff1ec7f-c703-4e56-8ff5-bb825604196c">|<img width="240px;" src="https://github.com/user-attachments/assets/dd15ef77-2893-4f3b-867e-c4c9f7deacb9">|

### 나의 식물

나의 식물을 등록하고 식물과 함께한 활동을 일기에 기록하고 추억할 수 있습니다. <br/>
작성된 일기는 식물 이야기에 등록되어 다른 식집사분들과 소중한 기억들을 공유할 수 있습니다.
|식물 등록|나의 식물 일기 상세|일기 작성|
|:-:|:-:|:-:|
|<img width="240px;" src="https://github.com/user-attachments/assets/d2edb67d-f16b-46ee-a64a-0328bff4bcf0">|<img width="240px;" src="https://github.com/user-attachments/assets/0453695f-2b3b-4595-869c-6450d54a1788">|<img width="240px;" src="https://github.com/user-attachments/assets/12cf4936-7ef3-47e1-89d4-9e16739a264d">|

### 식물 이야기

다른 식집사분들의 활동들을 확인할 수 있고 관심있는 식물을 팔로우하여 그 식물의 성장 과정을 관찰해나갈 수 있습니다.
|일기 상세 페이지|식물 팔로우|
|:-:|:-:|
|<img width="240px;" src="https://github.com/user-attachments/assets/faa6fda1-6127-4c2a-993d-fea0ad41f637">|<img width="240px;" src="https://github.com/user-attachments/assets/d73ded7a-92e0-45eb-94a1-08ec09804176">|

커뮤니티를 통해 정보를 공유할 수 있습니다.
| 게시글 상세 페이지 | 댓글 등록/수정/삭제 | 게시글 등록/삭제 |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| <img width="240px;" src="https://github.com/user-attachments/assets/9b39e8fa-1723-414c-8e20-35cf95e9ee66"> | <img width="240px;" src="https://github.com/user-attachments/assets/0a6b0270-4e02-480c-85d6-78eae5a581a0"> | <img width="240px;" src="https://github.com/user-attachments/assets/2e9a1b7b-6c9e-4c93-ad1c-ee75fd040c31"> |

<br />

## 4. 프로젝트 구조

```
📦 Greeny
├─ 📄 .env
├─ 📄 .env.local
├─ 📄 .eslintrc.json
├─ 📄 .gitignore
├─ 📄 .Prettierrc.cjs
├─ 📄 auth.d.ts
├─ 📄 env.d.ts
├─ 📄 next-env.d.ts
├─ 📄 next.config.mjs
├─ 📄 package.json
├─ 📄 README.md
├─ 📄 tsconfig.json
├─ 📄 yarn.lock
├─ 📁 .github
│  ├─ 📄 pull_request_template.md ---------- GitHub PR 템플릿
│  └─ 📁 ISSUE_TEMPLATE
│     └─ 📄 basic-issue-template.md -------- GitHub Issue 템플릿
└─ 📁 src
    ├─ 📄 auth.ts
    ├─ 📄 middleware.ts
    ├─ 📁 app
    │  ├─ 📁 (greeny)
    │  │  ├─ 📁 (home) --------------------- 홈 페이지
    │  │  ├─ 📁 books ---------------------- 식물 백과 페이지
    │  │  │  └─ 📁 [cntntsNo] -------------- 식물 백과 식물 상세 페이지
    │  │  ├─ 📁 event ---------------------- 이벤트 페이지
    │  │  ├─ 📁 plant ---------------------- 나의 식물 페이지
    │  │  │  ├─ 📁 new --------------------- 식물 등록 페이지
    │  │  │  └─ 📁 [id] -------------------- 식물 상세 페이지
    │  │  │      ├─ 📁 diaryEdit ----------- 식물 일기 페이지
    │  │  │      ├─ 📁 diaryNew ------------ 식물 일기 등록 페이지
    │  │  │      └─ 📁 edit ---------------- 식물 일기 수정 페이지
    │  │  ├─ 📁 profile -------------------- 프로필 페이지
    │  │  │  ├─ 📁 bookmark ---------------- 북마크 목록 페이지
    │  │  │  ├─ 📁 detail ------------------ 프로필 상세 페이지
    │  │  │  ├─ 📁 edit -------------------- 프로필 수정 페이지
    │  │  │  └─ 📁 [_id] ------------------- 다른 사용자 프로필 페이지
    │  │  │      ├─ 📁 plant --------------- 사용자의 식물 팔로우 페이지
    │  │  │      └─ 📁 user ---------------- 사용자의 다른 사용자 팔로우 페이지
    │  │  └─ 📁 story ---------------------- 식물 이야기 메인 페이지
    │  │      ├─ 📁 community -------------- 커뮤니티 메인 페이지
    │  │      │  ├─ 📁 new ----------------- 커뮤니티 게시글 등록 페이지
    │  │      │  └─ 📁 [id] ---------------- 커뮤니티 게시글 상세 페이지
    │  │      │      └─ 📁 edit ------------ 커뮤니티 게시글 수정 페이지
    │  │      └─ 📁 diaries ---------------- 식물 일기 메인 페이지
    │  │          └─ 📁 [id] --------------- 식물 일기 상세 페이지
    │  ├─ 📁 (user)
    │  │  ├─ 📁 login ---------------------- 로그인 페이지
    │  │  └─ 📁 signup --------------------- 회원가입 페이지
    │  ├─ 📁 api
    │  │  ├─ 📁 actions -------------------- 서버 액션 함수
    │  │  ├─ 📁 auth ----------------------- auth 관련
    │  │  └─ 📁 fetch ---------------------- fetch 함수
    │  └─ 📁 data -------------------------- 식물 정보 데이터
    ├─ 📁 components ----------------------- 컴포넌트
    ├─ 📁 hooks ---------------------------- 커스텀 훅
    ├─ 📁 styles --------------------------- CSS 초기화
    ├─ 📁 types ---------------------------- typescript 타입
    └─ 📁 utils ---------------------------- 유틸 함수
```

## 5. 역할 분담

![역할분담](https://github.com/user-attachments/assets/81f76712-f292-426a-ad26-b79bfb565a2c)

## 6. 플로우 차트

![플로우차트](https://github.com/user-attachments/assets/88ec72e8-cb34-4e8d-9322-c495f2031397)

## 7. 트러블 슈팅

- 로그인
  next-auth 모듈을 사용해서 로그인할 때, `signInWithCredentials` 함수 내부의 `redirect` 함수가 동작하지 않는 문제가 발생했습니다. <br/>대체 방법으로 'next/navigation' 모듈로부터 `useRouter` 훅의 `push` 메서드를 통해 로그인 성공 시 페이지 이동을 하였고 리팩터링 때 원인을 파악해 해결할 예정입니다.
- Open API 사용
  Open API를 통해 식물 데이터를 받아올 때 XML 방식 전달된 데이터를 JSON으로 파싱(xml2json 모듈 사용)하였고 불필요하고 정제가 필요한 값을 함수를 제작해 필터링하여 JSON 파일로 만들어 사용하였습니다.<br/>
  현재 방식은 데이터 통신이 없어 응답 속도가 빠르다는 장점이 있지만, 식물 데이터를 새로 추가하려 할 때면 새로 배포를 해야 하는 등 확장성 내지 유지보수 측면에서 분명한 단점이 있어서 앞으로는 일정 주기마다 Open API의 데이터 요청을 통해 DB를 최신화하는 리팩터링 작업을 진행할 예정입니다.

<br/>

## 8. 리팩터링 계획

### 웹 반응형 디자인

본 프로젝트는 앱을 주요 플랫폼으로 설정하고 있으나, 웹 사용자의 접근성을 고려하여 반응형 웹 디자인을 구현예정입니다.

### 성향 검사 및 식물 추천 페이지

초기 기획 리스트에 포함된 주요 기능 중 하나인 성향 검사 및 식물 추천 페이지는 메인 기능 리스트에서 후순위로 밀려 시간 제약으로 인해 리팩토링 리스트에 추가되었습니다.

### 공공 데이터 처리

현재 공공 데이터는 로컬에 저장하여 사용 중입니다. 이를 데이터베이스에 저장하고, 공공 데이터와 통신하여 데이터를 파싱하고 필요한 정보를 필터링하는 함수를 개발할 예정입니다. 이를 통해 식물 데이터가 주기적으로 업데이트되도록 할 것입니다.

### 식물 데이터 시각화

현재 식물 데이터는 단순한 문자 형식으로 표시되고 있습니다. 이를 개선하기 위해, 식물 데이터를 그래프로 시각화하여 사용자와의 상호작용을 높이고 가독성을 향상시킬 계획입니다.
