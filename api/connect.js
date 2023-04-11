import mysql from "mysql2"

export const db = mysql.createConnection({
  host:"lab.amintek.com",
  user:"root",
  password:"pw4Team2",
  database:"citec_team2_dbm",
  port:"6002"
  
},
console.log("finally connected to the database mother fucker")
)