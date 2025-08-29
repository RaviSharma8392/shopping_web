const connectDatabase = require("./db-config");
const { PORT, URI,EMAIL, EMAILPaSS, TOEMAIL,JWT_SECRET_KEY  } = require("./server-config");

module.exports={PORT,URI,EMAIL,EMAILPaSS,TOEMAIL,JWT_SECRET_KEY,connectDatabase}