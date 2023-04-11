import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {

  //const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
       
       
        <div className="menu">
          <span>#Category Tags</span>
          <div className="item">
          <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            <span>#Programming</span>
          </div>
          <div className="item">
          <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            <span>#Money</span>
          </div>
          <div className="item">
          <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            <span>#Bussiness</span>
          </div>
          <div className="item">
          <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            <span>#Health</span>
          </div>
          <div className="item">
          <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            <span>Education</span>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LeftBar;
