# Express.js와 MongoDB로 만든 블로그

## 실행 방법
1. .env 변수 설정
```
BCRYPT_SALT_ROUNDS=[bcrypt salt 값]
PORT=[port 번호]
DB_HOST=[MongoDB Host]
SESSION_SECRET=[Session 비밀번호]
SESSION_MAXAGE=[Session 만료시간]

최초 DB 연결시 생성되는 Admin 계정(Admin 계정만 글쓰기 권한있음)
ADMIN_ID=[Admin Id]
ADMIN_PASSWORD=[Admin Password]
```
```
ex)

BCRYPT_SALT_ROUNDS=12
PORT=3000
DB_HOST= mongodb://localhost:27017/blog2
SESSION_SECRET=1234
SESSION_MAXAGE=6000000
ADMIN_ID=admin
ADMIN_PASSWORD=1234
```

2. 서버 시작
```
npm i
npm start
```

<br>
<br>
<br>
<br>
<br>




### Todo List
- [x] post 삭제 구현
- [x] 로그인 안한 사람 post 쓰기, 저장, 수정 불가
- [x] 글쓴이와 로그인한 유저가 동일해야 삭제할 수 있도록 구현
- [x] post user collection 연결 index.pug 수정
- [x] user에 post, comment 연결
- [x] fetch로 comment 기능 구현
- [x] tag Schema
- [x] tag 화면
- [x] comment Schema tag, user와 연결
- [x] comment router, controller
- [x] comment view
- [x] 로그인 한 사람만 comment 쓸 수 있도록
- [ ] 대댓글 추가
- [x] 권한있는 유저만 글 쓸 수 있도록
- [ ] 이미지 업로드
- [x] pagination
- [ ] 에러 처리 점검 
- [ ] 코드 리팩토링
