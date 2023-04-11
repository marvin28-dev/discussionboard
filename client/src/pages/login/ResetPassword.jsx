import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const ResetPassword = () => {
  const [inputs, setInputs] = useState({
    
    email: "",
    password: "",
    
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/updatePassword", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        
        <div className="right">
          <h1>Update your password</h1>
          <div className="left">
          
          
        </div>
          <form>
            
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm your password"
              name="confirmpassword"
              onChange={handleChange}
            />
            {err && err}
            
            <button onClick={handleClick}>Update password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
