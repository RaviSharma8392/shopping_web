// import modules
const express = require("express");
const config  = require("./src/config");
const cors = require("cors");
const router=require("./src/routes")

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*"
}));

app.get("/api/v1",(req,res)=>{
  res.send("working")
})
app.use("/api",router)

const connectServer = async () => {
  app.listen(config.PORT, async () => {
    await config.connectDatabase();
    console.log(`Server running at http://localhost:${config.PORT}`);
  });
};
connectServer();
