import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const Like = (props)=>{
    const { currentUser } = useContext(AuthContext);
    const [profile_id, setProfile_id] = useState(currentUser.id);
    const [thread_id, setThread_id] = useState(props.mes);
    const queryClient = useQueryClient();

  const mutation = useMutation(
    (newLike) => {
      return makeRequest.post("/likes/addLike", newLike);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["like"]);
      },
    }
  );
  const handleClick = async (e) => {
    e.preventDefault();
   
    mutation.mutate({ profile_id, thread_id });
    
  };
    return(
        <div className="item">
            
            
        <button style={{background:"none"}} onClick={handleClick}><ThumbUpIcon /></button>
        
      </div>
    )
}
export default Like;