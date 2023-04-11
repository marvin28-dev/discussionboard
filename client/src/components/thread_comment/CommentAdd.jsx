import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
//import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

//import Comments from "../comments/Comments";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const CommentAdd = (props) => {
  
  const [threads, setThreads] = useState([]);
   
    useEffect(() => {
       fetch('http://localhost:8800/api/thread')
       //https://jsonplaceholder.typicode.com/posts?_limit=10
          .then((response) => response.json())
          .then((data) => {
             console.log(data);
             setThreads(data);
          })
          .catch((err) => {
             console.log(err.message);
          });
    }, []);
  

    const { currentUser } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [profile_id, setProfile_id] = useState(currentUser.id);
    const [thread_id, setThread_id] = useState(props.messag);
   
    const queryClient = useQueryClient();

    const mutation = useMutation(
      (newComment) => {
        return makeRequest.post("/comments/addComment", newComment);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["comments"]);
        },
      }
    );
    
    const handleClick = async (e) => {
      e.preventDefault();
      let imgUrl = "";
      
      mutation.mutate({ profile_id, message, thread_id, image: imgUrl });
      setMessage("");
      //setThread_id("");
      setFile(null);
      window.location.reload()
    };
    return(
        <div>
          <input type="text" className="commentfield" placeholder="click inother to enter a comment" onChange={(e) => setMessage(e.target.value)} value={message} />
        
          <button onClick={handleClick}><SendIcon/></button>
        
        </div>
    )
}

export default CommentAdd;