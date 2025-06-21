// import dotenv file
require('dotenv').config()

const URI=process.env.URI
const PORT=process.env.PORT
const EMAIL=process.env.EMAIL
const EMAILPaSS=process.env.EMAILPaSS
const TOEMAIL=process.env.TOEMAIL

module.exports={URI,PORT,EMAIL,EMAILPaSS,TOEMAIL}