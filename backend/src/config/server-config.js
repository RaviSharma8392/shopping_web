// import dotenv file
require('dotenv').config()

const URI=process.env.URI
const PORT=process.env.PORT
const EMAIL=process.env.EMAIL
const EMAILPaSS=process.env.EMAILPaSS
const TOEMAIL=process.env.TOEMAIL
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY
console.log( JWT_SECRET_KEY,)

module.exports={URI,PORT,EMAIL,EMAILPaSS,TOEMAIL,JWT_SECRET_KEY}