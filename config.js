require("dotenv").config();

// 환경변수가 있는지 확인
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

const config = {
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  port: parseInt(required("PORT", 3000)),
  db: { host: required("DB_HOST") },
  session: {
    secret: required("SESSION_SECRET"),
    maxAge: parseInt(required("SESSION_MAXAGE")),
  },
  master: {
    id: required("MASTER_ID", "master"),
    password: required("MASTER_PASSWORD", "1234"),
  },
};

module.exports = config;
