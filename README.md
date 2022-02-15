# Express.js와 MongoDB로 만든 블로그
http://ec2-44-201-168-32.compute-1.amazonaws.com:9000/

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
