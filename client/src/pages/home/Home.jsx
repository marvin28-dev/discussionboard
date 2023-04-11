
import Threads from "../../components/threads/Threads"
import Shared from "../../components/share/Share"
import "./home.scss"

const Home = () => {
 

  return (
    <div className="home">
     
      <Shared/>
      <Threads/>
    </div>
  )
}

export default Home