import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req,res)=>{
    const q = "SELECT profile_id FROM thread_like WHERE thread_id = ?";

    db.query(q, [req.query.thread_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(like=>like.thread_id));
    });
}

export const addLike = (req, res) => {
  const q = "INSERT INTO thread_like (`profile_id`,`thread_id`) VALUES (?)";
  const values = [
    
    req.body.profile_id,
    req.body.thread_id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post has been liked.");
  });
};

export const deleteLike = (req, res) => {



    const q = "DELETE FROM thread_like WHERE `profile_id` = ? AND `thread_id` = ?";
    const values = [
    
      req.body.profile_id,
      //req.body.thread_id,
      
    ];
    db.query(q, [values, req.query.thread_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thread has been disliked.");
    });
  
};