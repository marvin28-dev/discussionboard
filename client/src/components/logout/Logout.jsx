import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";


import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    //const [isLoggedin, setIsLoggedin] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const user = sessionStorage.getItem(currentUser);
    const navigate = useNavigate();
    const [err, setErr] = useState(null);
    if (user) return JSON.parse(user);
    

    // handle click event of logout button
    const handleLogout = async(e) => {
        // remove the token and user from the session storage
        e.preventDefault();
        
        try {
          await axios.post("http://localhost:8800/api/auth/logout");
          localStorage.clear();
          sessionStorage.clear();
          navigate("/login");
        } catch (err) {
          setErr(err.response.data);
        }
        //props.history.push('/login');
    }
  

 
   
   
    

    

    return(
        <div>
      
      
            <button onClick={handleLogout}><LogoutIcon/></button>
       
        </div>
    )
}





/*
const Logout = () => {
    const { currentUser } = useContext(AuthContext);
    const [profile_id, setProfile_id] = useState(currentUser.id);
   
   
    const queryClient = useQueryClient();

    const mutation = useMutation(
      (newComment) => {
        return makeRequest.post("/auth/logout", newComment);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["logout"]);
        },
      }
    );
  
    const handleClick = async (e) => {
      e.preventDefault();
     
      
      mutation.mutate({ profile_id,});

    };
    return(
        <div>
      
      
            <button onClick={handleClick}><SendIcon/></button>
       
        </div>
    )
}
*/
export default Logout;