import "./thread.scss";
//import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
//import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';

//import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
//import Comments from "../comments/Comments";
import { useState } from "react";
//import moment from "moment";
//import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
//import { makeRequest } from "../../axios";
//import { useContext } from "react";
//import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useEffect } from "react";
import Comment from "../thread_comment/Comment";
import CommentAdd from "../thread_comment/CommentAdd";
import Like from "./Like"
import UnLike from "./Unlike"





const Thread = () => {
   const [threads, setThreads] = useState([]);
   const [commentOpen, setCommentOpen] = useState(false);
   
   
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

return (
   // ... consume here
   <div className="post">
      {threads.map((thread) => {
         return (
          <div key={thread.id} className="container">
          <div className="user">


            <div className="userInfo">
              <img src={"https://cdn.pixabay.com/photo/2016/08/21/18/48/emoticon-1610518_960_720.png"} alt="" />
              <div className="details">
                <Link
                  to={`https://images.unsplash.com/photo-1670272499232-d6c55af87386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="name">{thread.profile_name}</span>
                </Link>
                <span className="date">{thread.createdOn}</span>
                
                
              </div>
            </div>
          </div>
          <div className="content">
            <p>{thread.message}</p>
            <img src={thread.image} alt="" />
          </div>
          <div>
          <span style={{ color: 'grey',}}>Comments Under this post</span>
          <p style={{fontStyle: 'italic'}}>
            
            
          <Comment mess={thread.id}/>
          </p>
          </div>
          <div className="info">
            <div className="item">
              <RemoveRedEyeIcon />
              
              {thread.views} Views
            </div>
            <div className="item">
              <TextsmsOutlinedIcon />
              {thread.comments} Comments
              
            </div>
            <div className="item">
              <Like mes={thread.id}/>
              {thread.likes} Likes
            </div>
            <div className="item">
              <UnLike messages={thread.id}/>
              </div>
          </div>
          <div>
         <CommentAdd messag={thread.id}/>
          </div>
          
        </div>
        
           
         );
      })}
      
   </div>
);
};
/*const Thread = ()=>{
 
  return (
    <div>
    <p>The best</p>
    <p>The best</p>
    </div>
  );
  }*/
  
  
  
  
  export default Thread;















/*const Thread = ()=>{
  const [threads, setThreads] = useState([])

  useEffect(()=>{
    const fetchAllThreads = async() =>{
      try{
        const res = await axios.get("http://localhost:8800/api/threads")
        setThreads(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchAllThreads();
  }, []);
  console.log(threads)
return (
  <div className="post">
    {threads.map((thread) => {
      return (
        <div key={thread.id} className="container">
          <div className="user">


            <div className="userInfo">
              <img src={"https://images.unsplash.com/photo-1670272499232-d6c55af87386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="" />
              <div className="details">
                <Link
                  to={`https://images.unsplash.com/photo-1670272499232-d6c55af87386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="name">Newguy</span>
                </Link>
                <span className="date">the best</span>
              </div>
            </div>
          </div>
          <div className="content">
            <p>no</p>
            <img src={"https://images.unsplash.com/photo-1670272499232-d6c55af87386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="" />
          </div>
          <div className="info">
            <div className="item">
              The best
            </div>
            <div className="item">
              <TextsmsOutlinedIcon />
              See Comments
            </div>
            <div className="item">
              <ShareOutlinedIcon />
              Share
            </div>
          </div>
          the best
        </div>
      );
    })}
    
  </div>
);
}*/




/*
<div className="post">
   
    <div className="container">
      <div className="user">
        <div className="userInfo">
          <img src={"https://images.unsplash.com/photo-1670272499232-d6c55af87386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="" />
          <div className="details">
            <Link
              to={`https://images.unsplash.com/photo-1670272499232-d6c55af87386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="name">Newguy</span>
            </Link>
            <span className="date">the best</span>
          </div>
        </div>
        
      </div>
      <div className="content">
        <p>The best that ever did</p>
        <img src={"https://images.unsplash.com/photo-1670272499232-d6c55af87386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="" />
      </div>
      <div className="info">
        <div className="item">
          5 views
        </div>
        <div className="item">
          <TextsmsOutlinedIcon />
          See Comments
        </div>
        <div className="item">
          <ShareOutlinedIcon />
          Share
        </div>
      </div>
      
    </div>
 
  </div>
*/


/*const Thread = ({ thread }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", thread.id], () =>
    makeRequest.get("/likes?thread_id=" + thread.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?thread_id=" + thread.id);
      return makeRequest.post("/likes", { thread_id: thread.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (thread_id) => {
      return makeRequest.delete("/thread/" + thread_id);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["threads"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(thread.id);
  };*/

  /*return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/"+thread.picture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${thread.thread_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{thread.name}</span>
              </Link>
              <span className="date">{moment(thread.createdOn).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && thread.user_id === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{thread.message}</p>
          <img src={"/upload/" + thread.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        //{commentOpen && <Comments postId={thread.id} />}
      </div>
    </div>
  );
};

export default Thread;*/
