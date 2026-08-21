import dotenv from 'dotenv';

dotenv.config();

const config = {
  port:process.env.PORT || 5000,
  db_port:process.env.DATABASE_PORT,
  host:process.env.HOST || " ",
  jwt_secret:process.env.JWT_SECRET || " ",
}

export default config;