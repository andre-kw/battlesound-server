module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'change-ur-secret',
  SC_CLIENT_ID: process.env.SC_CLIENT_ID || 'change-ur-client-id',
};