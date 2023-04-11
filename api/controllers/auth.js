import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = (req, res) => {
  
  
  var email = req.body.email;
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if(!email.match(emailFormat)) return res.status(500).json("enter a valid email");
  if(req.body.password != req.body.confirmpassword) return res.status(500).json("your password dont match");
  
  
  const q = "SELECT * FROM user WHERE email = ?";
//CHECK USER IF EXISTS
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    db.beginTransaction(function(err){
       if (err) {                  //Transaction Error (Rollback and release connection)
            db.rollback(function() {
                db.release();
                //Failure
            });
        } else {

        const q = "INSERT INTO profile (`name`) VALUE (?)";
    
        const values = [
          req.body.name
        ];
    
        db.query(q, [values], (err, data) => {
          if (err) {          //Query Error (Rollback and release connection)
            db.rollback(function() {
                db.release();
                //Failure
            });
            return res.status(500).json(err);
          }
          const q = "INSERT INTO user (`profile_id`, `email`, `password`) VALUE (?)"
          const values =[
            data.insertId,
            req.body.email,
            hashedPassword
          ]
          db.query(q, [values], (err, data) => {
            if (err) {          //Query Error (Rollback and release connection)
              db.rollback(function() {
                  db.release();
                  //Failure
              });
              return res.status(500).json(err);
            } else {
              db.commit(function(err) {
                  if (err) {
                      db.rollback(function() {
                          db.release();
                          //Failure
                      });
                      return res.status(500).json(err);
                  } else {
                      //db.release();
                      return res.status(200).json("User has been created.");
                  }
              });
            }
            
          });
          
        });

        }   
    })

  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE email = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};



export const forgotPassword = (req, res) => {
  
    const { email } = req.body;
  
    db.query(
      `SELECT * FROM user WHERE email = '${email}'`,
      (error, results) => {
        if (error) throw error;
  
        if (results.length === 0) {
          res.status(400).send({ message: "Email not found" });
        } else {
          const transporter = nodemailer.createTransport({
            
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: "ekoteksolutions28@gmail.com",
              pass: "cwwlsebqbegryeha",
            },
          });
  
          const mailOptions = {
            from: "ekoteksolutions28@gmail.com",
            to: email,
            subject: "TutorMe Reset Password",
            text: "Please click the following link to reset your password: http://localhost:3000/ResetPassword",
          };
  
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).send({ message: "Error sending email" });
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).send({ message: "Email sent successfully" });
            }
          });
        }
      }
    );
  
  
};

export const updatePassword = (req, res) => {


  const q = "SELECT * FROM user WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
     const q = `UPDATE user SET password = ? WHERE email = '${req.body.email}'` ;
     const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
     const values =[
      
     
      hashedPassword
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'check your console log'});
      } else {
        res.status(200).json({ message: 'Password updated successfully' });
      }
    })
  
  })

}
export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};


