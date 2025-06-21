const connectDatabase = require("./db-config");
const { PORT, URI,EMAIL, EMAILPaSS, TOEMAIL  } = require("./server-config");

module.exports={PORT,URI,EMAIL,EMAILPaSS,TOEMAIL,connectDatabase}