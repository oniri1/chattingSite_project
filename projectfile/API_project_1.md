- mainPage

| Path                  | Method | Query | RequestBody | RequestCookie | ResponseBody                | ResponseCookie | 비고                    |
| --------------------- | ------ | ----- | ----------- | ------------- | --------------------------- | -------------- | ----------------------- |
| /                     | GET    |       |             |               | 메인 웹 페이지              |                |                         |
| /ranRooms             | POST   |       |             |               | [{roomId, title, tag}, ...] |                | hrf: /room/:roomId      |
| /search               | POST   |       | {roomName}  |               | [{roomId, title, tag}, ...] |                | hrf: /room/:roomId      |
| /highLight/room       | POST   |       |             |               | [{roomId, title, tag}, ...] |                | hrf: /room/:roomId      |
| /highLight/recomments | POST   |       |             |               | [{chatId, user, chat}, ...] |                | hrf: /recomment/:chatId |
| /makeRoom             | POST   |       | {title,tag} |               | redirect : /                |                |                         |

필요한 함수 (func)

1. {roomId, title, tag 를 이용해 배열의 length 만큼 room GUI 생성하는 함수 }
2. {roomId, title, tag 를 이용해 배열의 length 만큼 highlight room GUI 생성하는 함수 }
3. {chatId, user, chat 를 이용해 배열의 length 만큼 highlight chat GUI 생성하는 함수 }

- userPage

| Path                 | Method | Query | RequestBody    | RequestCookie | ResponseBody                 | ResponseCookie   | 비고                    |
| -------------------- | ------ | ----- | -------------- | ------------- | ---------------------------- | ---------------- | ----------------------- |
| /user                | GET    |       |                | user: name    | 유저 프로필 웹 페이지        |                  |                         |
| /user/get/rooms      | POST   |       |                | user: name    | [{roomId, title, tag}, ...]  |                  | hrf: /room/:roomId      |
| /user/get/recomments | POST   |       |                | user: name    | [{title, chatId, chat}, ...] |                  | hrf: /recomment/:chatId |
| /user/delete/room    | POST   |       | {roomId}       | user: name    | redirect: ./                 |                  |                         |
| /user/delete/chat    | POST   |       | {chatId}       | user: name    | redirect: ./                 |                  |                         |
| /user/set/name       | POST   |       | {email , name} | user: name    | redirect: ./                 |                  |                         |
| /user/set/password   | POST   |       | {email , pw}   | user: name    | redirect: ./                 |                  |                         |
| /user/kill           | POST   |       | {email}        | user: name    | redirect: /                  | user : 0s cookie |                         |

필요한 함수 (func)

1. {roomId, title, tag 를 이용해 배열의 length 만큼 room GUI 생성하는 함수 }
2. {title, chatId, chat 를 이용해 배열의 length 만큼 chat GUI 생성하는 함수 }

- loginPage

| Path   | Method | Query | RequestBody | RequestCookie | ResponseBody     | ResponseCookie | 비고 |
| ------ | ------ | ----- | ----------- | ------------- | ---------------- | -------------- | ---- |
| /login | GET    |       |             |               | 로그인 웹 페이지 |                |      |
| /login | POST   |       | { id, pw }  |               | redirect : /     | user: name     |      |

- registPage

| Path    | Method | Query | RequestBody            | RequestCookie | ResponseBody       | ResponseCookie | 비고 |
| ------- | ------ | ----- | ---------------------- | ------------- | ------------------ | -------------- | ---- |
| /regist | GET    |       |                        |               | 회원가입 웹 페이지 |                |      |
| /regist | POST   |       | {id, pw, pw-ck, email} |               | redirect : /login  |                |      |

- roomPage

  | Path          | Method | Query         | RequestBody                   | RequestCookie | ResponseBody        | ResponseCookie | 비고        |
  | ------------- | ------ | ------------- | ----------------------------- | ------------- | ------------------- | -------------- | ----------- |
  | /room/:roomId | GET    | params.roomId |                               |               | recomment 웹 페이지 |                |             |
  | "chatReply"   | socket |               | talk.value                    |               | chatElement(Str)    |                | socket.emit |
  | "chatLoad"    | socket |               | {time: time, roomId: +roomId} |               | chatElement(Str)    |                | socket.emit |

- recommentPage

| Path                | Method | Query         | RequestBody | RequestCookie | ResponseBody                | ResponseCookie | 비고 |
| ------------------- | ------ | ------------- | ----------- | ------------- | --------------------------- | -------------- | ---- |
| /recomment/:chatId  | GET    | params.chatId |             |               | recomment 웹 페이지         |                |      |
| /recomment/contents | POST   |               | {chatId}    |               | {title,user,chat,createdAt} |                |      |
| /recomment/comments | POST   |               | {chatId}    |               | {user,content,createdAt}    |                |      |
