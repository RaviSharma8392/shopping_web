const mongoose = require("mongoose");
const config=require("./server-config")

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.URI);
    console.log("✅database connect successfully");
  } catch (error) {
    console.error("❌error in connecting database:" + error);
  }
};
module.exports=connectDatabase
