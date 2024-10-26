import dotenv from 'dotenv'

dotenv.config()

const databaseUrl = process.env.MONGODB_URL
const databaseName = process.env.DB_NAME
const PORT = process.env.PORT
const corsOrigin = process.env.CORS_ORIGIN
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY
const jwtSecret = process.env.JWT_SECRET
const smtpHost = process.env.SMTP_HOST
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpPort = process.env.SMTP_PORT
const googleId = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET
const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET
const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT
const redisPass = process.env.REDIS_PASSWORD


export {
    databaseName,
    databaseUrl,
    PORT,
    corsOrigin,
    accessTokenExpiry,
    accessTokenSecret,
    refreshTokenExpiry,
    refreshTokenSecret,
    jwtSecret,
    smtpHost,
    smtpPass,
    smtpPort,
    smtpUser,
    googleId,
    googleSecret,
    githubId,
    githubSecret,
    redisHost,
    redisPass,
    redisPort,

}