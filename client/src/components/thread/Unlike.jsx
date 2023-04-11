import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { useContext,} from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import React, { useState } from 'react';
import axios from 'axios';

const UnLike = (props) => {
  
  const { currentUser } = useContext(AuthContext);
  const profile = currentUser.id;
  const [thread_like_id, setThread_like_id] = useState(null);
  const handleClick = () => {
    axios.delete('http://localhost:8800/api/likes/deleteLike?thread_id=' + props.messages, { data: { profile } })
      .then(() => {
        setThread_like_id(thread_like_id)
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="item">
            
            
        <button style={{background:"none"}} onClick={handleClick}><ThumbDownIcon /></button>
        
      </div>
  );
};



export default UnLike;