import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, p.name AS profile_id, message FROM thread_comment AS c JOIN profile AS p ON (p.id = c.profile_id)
    WHERE c.thread_id = ? `;
    
  db.query(q, [req.query.thread_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const addComment = (req, res) => {
   
  const q = "INSERT INTO thread_comment (`thread_id`,`profile_id`,`message`,`thread_comment_id`) VALUE (?)";
  const values = [
  req.body.thread_id,
  req.body.profile_id,
  req.body.message,
  req.body.thread_comment_id,
  
  ];
db.query(q, [values], (err, data) => {
  if (err) return res.send(err);
  return res.status(200).send("Comment has been added successfully");
});





}


export const deleteComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    const q = "DELETE FROM thread_comment WHERE `id` = ? AND `profile_id` = ?";

    db.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    });
  });
};
