import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  google_smtp_auth_pass: process.env.GOOGLE_SMTP_AUTH_PASS,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
  cloudinary_url: process.env.CLOUDINARY_URL

};
