# 영화 검색 

## 진행 기간 : 2022년 04월 28일(목) ~ 05월 19일(목)

## 내용

- Open API로 영화 검색 사이트 구현
- 바닐라 자바스크립트만으로 개발

## API 

[The Open Movie Database](http://www.omdbapi.com/)

---

0. 실행법 🖥️

```
npm i
npm run dev -개발 모드용
npm run build -배포용
```

1. 결과물 🔎

결과물(https://quiet-naiad-4ea229.netlify.app/)

2. 사용 기능/툴 ✨
- 번들러(파슬)
- scss
- 엑시오스 API
- 인터섹션 옵저버 API
- postcss
- autoprefixer
- babel
그 외 각종 로더와 플러그인

3. 구현 기능 정리 ✏️

1️⃣ 이벤트 핸들러 - 엔터 키 / 마우스로 버튼 클릭 시 검색 기능 적용

2️⃣ 비동기 처리 - Axios GET을 이용해 쿼리스트링 형식으로 요청

3️⃣ 목록 보여주기 - 받은 데이터 목록 중 포스터 이미지가 없으면 교체 후 화면에 출력

4️⃣ 에러처리 - try catch + async await 에러 관련된 처리 switch case로 적용

5️⃣ 인터섹션 옵저버 활용한 무한스크롤 - Intersection Observer API 사용. 검색결과의 추가 목록이 있으면 observe 붙인 요소를 숨김/보임 하고, GET으로 추가 데이터 요청


4. 학습 키워드 😊
   
- Intersection Observer API
- 무한 스크롤
- 기능 별 코드 분리 시도
- 유효성 검사/에러 처리
- 대체 이미지 적용
- HTTP/HTTPS와 REST API, Axios API
- 간단한 데이터 저장/가공

5. 회고 / 간단 정리 🤔

그간 부족했던 기초 지식들, Axios의 API와 기능들을 추가로 학습했다.

Axios에서 쿼리스트링 형태로 요청하려면 params 속성을 사용한다.

params에 2차원 배열, 객체 등 세부 데이터 형태를 담으려면 qs 라이브러리를 쓰는 것이 좋다는 것을 배웠다.

스크롤 시 남은 목록을 확인 후 API 요청하는 기능 등 사용자 UX 부분을 고려하게 되었다.

데이터를 화면에 출력하는 것에서 생각보다 고민이 있었다.
받아온 전체 데이터의 원본을 저장 후, 데이터를 가공하고 반복문으로 돌리자니 너무 효율이 없고,
신규 목록만 화면에 출력하자니 데이터의 가공/원본 처리를 어디에 둬야 좋을지 고민스러웠다💦

요소를 display:none으로 적용하면 랜더링 되지 않으니 observe를 사용할 수 없다

visibility속성을 숨김/보임 처리하고, 추가 목록이 없으면 display:none을 적용하는 방식으로 구현했다