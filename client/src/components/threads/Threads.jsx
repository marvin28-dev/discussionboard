import Thread from "../thread/Thread";
import "./threads.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

/*const Threads = ({profile_id}) => {
  const { isLoading, error, data } = useQuery(["threads"], () =>
    makeRequest.get("/thread?profile_id="+profile_id).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      <Thread/>
    </div>
  );
};*/

const Threads = () => {
  return (
    <div className="posts">
      <Thread/>
    </div>
  );
};
export default Threads;
