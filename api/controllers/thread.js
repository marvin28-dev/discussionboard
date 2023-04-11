import { db } from "../connect.js";
import jwt from "jsonwebtoken";





export const addThread = (req, res) => {
 

  

    
    const q = "INSERT INTO thread (`category_id`,`message`,`profile_id`,`image`) VALUE (?)";
    const values = [
    req.body.category_id,
    req.body.message,
    req.body.profile_id,
    req.body.image,
    ];
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).send("Thread has been created successfully");
  });

  

  

}
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });}

  export const getThread = (req, res) => {
    //const q = 'SELECT t.*,p.name as profile_name, p.image as profile_image,(select count(*) from thread_like where thread_id = t.id) as likes ,(select count(*) from thread_view where thread_id = t.id) as views ,(select count(*) from thread_comment where thread_id = t.id) as comments FROM thread as t profile as p on p.id = t.profile_id';
    const q = 'SELECT t.*,p.name as profile_name,p.id as profile_id, p.emoji as profile_image,(select count(*) from thread_like where thread_id = t.id) as likes,(select count(*) from thread_view where thread_id = t.id) as views,(select count(*) from thread_comment where thread_id = t.id) as comments FROM thread as t join profile as p on p.id = t.profile_id';
    db.query(q, (err, data) => {
      if(err) res.json(err);
      return res.json(data);
    })
  }














































  /*export const getThread = (req, res) => {
    const profile_id = req.query.profile_id;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      console.log(profile_id);
  
      const q =
        profile_id !== "undefined"
          ? `SELECT p.*, u.id AS profile_id, name, emoji FROM thread AS p JOIN profile AS u ON (u.id = p.profile_id) WHERE p.profile_id = ? ORDER BY p.createdOn message`
          : `SELECT p.*, u.id AS profile_id, name, emoji FROM thread AS p JOIN profile AS u ON (u.id = p.profile_id) ORDER BY p.createdOn message`;
  
      const values =
        profile_id !== "undefined" ? [profile_id] : [userInfo.id, userInfo.id];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  };*/

/*export const getThread = (req, res) => {
  const profile_id = req.query.profile_id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(profile_id);

    const q =
      profile_id !== "undefined"
        ? `SELECT p.*, u.id AS profile_id, name, emoji FROM thread AS p JOIN profile AS u ON (u.id = p.profile_id) WHERE p.profile_id = ? ORDER BY p.createdOn message`
        : `SELECT p.*, u.id AS profile_id, name, emoji FROM thread AS p JOIN profile AS u ON (u.id = p.profile_id) ORDER BY p.createdOn message`;

    const values =
      profile_id !== "undefined" ? [profile_id] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addThread = (req, res) => {



  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO thread(`message`,`createdOn`,`profile_id`) VALUES (?)";
    const values = [
      req.body.message,
      //req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
};*/
