import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import ResetPassword from "./ResetPassword";
import "./login.scss";
import axios from "axios";
const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    
    email: "",
    
  });
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      
        await axios.post("http://localhost:8800/api/auth/forgotPassword", inputs);
     
    }catch(error){
      setError(error.response.data);
    }
    
  };
  console.log(error)

  return (
    <div className="login">
      <div className="card">
        
        <div className="right">
          <h1>Forgot Password</h1>
          <div className="left">
          <span>remembered your password?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
          <form>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <p>An email will be sent to your shortly to reset your password after you inpup a correct email and press the reset paswword button</p>
            {error && error}
            
           
            <button onClick={handleSubmit}>Reset Password</button>
          
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

