module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://jordan:haddadi@roadrate-qquzy.mongodb.net/roadrate?retryWrites=true&w=majority', // production
  // MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://jordan:haddadi@roadrate-qquzy.mongodb.net/test?retryWrites=true&w=majority', // development
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  // API_BASE_URL: process.env.API_URL || 'https://road-rate-server.herokuapp.com/api',
  // use line 9 if working locally, line 7 if deploying
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
}; 