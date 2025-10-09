require('dotenv').config();
require('module-alias/register')

const app = require('./app');
const { connectToDatabase } = require('@/services/database.service');

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`🚀 Server is running at http://localhost:${PORT}`));
  } catch (error) {
    console.error('💥 The server failed to start:', error);
    process.exit(1);
  }
})();
