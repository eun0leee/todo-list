# ☑️ window95 Todo-list ☑️

window98 Todo-list 프로젝트는 Rest API를 사용하여 Vanilla JavaScript로 CRUD(Create, Read, Update, Delete)를 구현해보는 것을 중심으로하여, JavaScript의 메서드 및 내장함수에 익숙해지는 것 등 JavaScript로 웹페이지를 만드는데 익숙해지는 것을 목표로 만들어졌습니다. 사용자는 To-do list를 만들고 삭제하고 수정하고 조회하는 것을 해볼 수 있습니다. 추가로 Open Api를 사용하여 날씨와 지역, 시간을 볼 수 있습니다.

## ☑️ 사이트

- [Demo Site](https://window98-todolist-with-kitty.netlify.app/)

![gif-800px](https://github.com/eun0leee/window98-Todo-list/assets/90189513/ee1b007e-d0a4-4daa-aaa9-8a1836748d53)

## ☑️ 프로젝트 기간

2022.11.28 ~ 2022.12.06

## ☑️ 기술스택

<img alt="Html" src ="https://img.shields.io/badge/HTML-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="CSS3" src ="https://img.shields.io/badge/CSS3-FF9933.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/> <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white"/>

## ☑️ 화면구성

|                                                         todo 등록 전                                                         |
| :--------------------------------------------------------------------------------------------------------------------------: |
| <img width="700" src="https://github.com/eun0leee/window98-Todo-list/assets/90189513/8477e226-486a-438b-9495-9cf23f35dbb0"/> |
|                                                         todo 등록 후                                                         |
| <img width="700" src="https://github.com/eun0leee/window98-Todo-list/assets/90189513/91ee9dab-a072-4d7f-b859-7aaadb1e1bf6"/> |

## ☑️ 구현내용

- Rest API로 To-do를 추가, 조회, 수정, 삭제
- 수정시 수정일시 변경
- To-do가 없을 때 안내문구 표시
- To-do를 체크하여 완료상태인 취소선 표시로 변경
- 수정일시 최신순으로 정렬
- 세가지 상태인 '완료된 To-do, 진행중인 To-do, 모두'로 필터
- 사용자가 로그인하고 로그아웃하는 것은 로컬스토리지 사용
- 현재 시간 위젯
- 현재 지역과 날씨 위젯

## ☑️ 구현내용 상세, 해결한 것, 회고

- 자세한 내용은 블로그 포스팅에서 보실 수 있습니다
  - [Vaniila JS로 To-do 사이트 만들기(CRUD 구현, Rest API 활용)](https://velog.io/@eun0leee/todo)
- 주요 구현 내용 포스팅
  - [[JS] Vanilla JS로 To-do 사이트 만들 때, API 연동하기(fetch 방식)](https://velog.io/@eun0leee/JS-To-do-사이트-만들-때-API-연동하기)
  - [[JS] Vanilla JS로 To-do list 수정 구현하기](https://velog.io/@eun0leee/JS-Vanilla-JS로-To-do-list-수정-구현하기)
  - [[CSS] 한글만 다른 폰트 적용하기](https://velog.io/@eun0leee/CSS-다른-폰트-적용)
  - [[CSS] input checkbox 스타일 적용하기](https://velog.io/@eun0leee/CSS-input-checkbox-스타일-적용하기)

## ☑️ 디렉토리 구조

```
┏ 📦css
┃ ┣ #️⃣reset-css.css
┃ ┗ 📜style.css
┣ 📦js
┃ ┣ 📜APIkey.js
┃ ┣ 📜APIs.js
┃ ┣ 📜clock.js
┃ ┣ 📜location-and-weather.js
┃ ┗ 📜main.js
┃ ┗ 📜username.js
┣ 📜index.html
┣ 📜package-lock.json
┣ 📜package.json
┗ 📜README.md
```
