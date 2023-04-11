import CommentReply from "./CommentReply"
import { useState } from "react";
import { useEffect } from "react";
const Comment = (props) => {
    const [comments, setComments] = useState([]);
    const [fields, setFields] = useState([]);

   

   const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
   };
   
   useEffect(() => {
      fetch('http://localhost:8800/api/comments/getComments?thread_id=' + props.mess )
      //https://jsonplaceholder.typicode.com/posts?_limit=10
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setComments(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
    return(
        <div>
        
        {comments.map((comment) => {
         const handleAddField = () => {
            setFields([...fields, <CommentReply nachricht={comment}/>]);
           };
           return(
            <div key={comment.id}>

                <div>{comment.profile_id} Commented with a comment id of {comment.id}: {comment.message} {comment.thread_comment_id} 
                
                <button onClick={handleAddField}>reply comment</button>
                  {fields.map((field, index) => (
                  <div key={index}>
                     {field}
                     <button onClick={() => handleRemoveField(index)}>Remove Comment field</button>
                  </div>
                  ))}
                </div>
              
                
            </div>
           );
           
        })},
        </div>
    )
}

export default Comment;