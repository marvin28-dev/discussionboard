import "./share.scss";
import Image from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [profile_id, setProfile_id] = useState(currentUser.id);
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/", formData);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newThread) => {
      return makeRequest.post("/thread", newThread);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["thread"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ profile_id, message, category_id, image });
    setMessage("");
    setCategory_id("");
    setImage("");
    setFile(null);
    window.location.reload()
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"https://cdn.pixabay.com/photo/2016/08/21/18/48/emoticon-1610518_960_720.png"} alt="" />
            <input
              type="text"
              placeholder={`${currentUser.email}! post on tutorMe today?`}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <input
              type="text"
              placeholder={`Include an image link`}
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
            
            
          </div>
          
          
        </div>
       
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" style={{color:'grey'}}>Select a category for your post</InputLabel>
              <Select
              
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category_id}
                label="Enter a Category of your post"
                onChange={(e) => setCategory_id(e.target.value)}
              >
                <MenuItem value={1} style={{color:'grey'}}>money</MenuItem>
                <MenuItem value={2} style={{color:'grey'}}>programming</MenuItem>
                <MenuItem value={3} style={{color:'grey'}}>bussiness</MenuItem>
                <MenuItem value={4} style={{color:'grey'}}>education</MenuItem>
              </Select>
            </FormControl>
           
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
           
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};










































/*const Share = async(name, description, message, profile,image) => {
  await fetch('http://localhost:8800/api/thread', {
      method: 'POST',
      body: JSON.stringify({
         name: name,
         description: description,
         message: message,
         profile: profile,
         image: image
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
         setShares((shares) => [data, ...shares]);
         setName('');
         setDescription('');
         setMessage('');
         setProfile('');
         setImage('');
      })
      .catch((err) => {
         console.log(err.message);
      });


const handleSubmit = (e) => {
   e.preventDefault();
   addShares(name, description, message, profile,image);
};    

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"https://cdn.pixabay.com/photo/2016/08/21/18/48/emoticon-1610518_960_720.png"} alt="" />
            
            <input
              type="text"
              placeholder={`C Name`}
              onChange={(e) => setMessage(e.target.value)}
              value={name}
            />
            <input
              type="text"
              placeholder={`C Description`}
              onChange={(e) => setMessage(e.target.value)}
              value={description}
            />
            <input
              type="text"
              placeholder={`Profile ID`}
              onChange={(e) => setMessage(e.target.value)}
              value={profile}
            />
            <input
              type="text"
              placeholder={`image`}
              onChange={(e) => setMessage(e.target.value)}
              value={image}
            />
            <input
              type="text"
              placeholder={`Message`}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
           
          </div>
          <div className="right">
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );

}
*/




/*

/*const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/thread", newThread);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["thread"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.emoji} alt="" />
            <input
              type="text"
              placeholder={`${currentUser.email}! post on tutorMe today?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
           
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};*/

export default Share;
