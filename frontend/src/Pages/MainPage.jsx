import axios from "axios";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import AllPost from "../Components/AllPost";
import Loading from "../Components/Loading";

function MainPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true)
        const fetchdata = await axios.get(
          `${import.meta.env.VITE_URL}/api/chat`,
          {
            withCredentials: true,
          }
        );
        setData( fetchdata.data.users);
        setLoading(false)
        // console.log(fetchdata.data.users);
      } catch (error) {
        console.log("Error in fetching users", error.message);
      }
    };
    fetchAllUsers();
  }, []);

  const cursorAnimation=(e)=>{
    const x=e.pageX;
    const y=e.pageY;
    const dot=document.querySelector('#dot');
    dot.style.left=x+"px";
    dot.style.top=y+"px";

  }


  return (
    <div onMouseMove={cursorAnimation}  className="w-full relative cursor-none transition-all h-screen bg-[#1A1A19] px-5 text-white flex justify-between items-center">
<div id="dot" className="w-[20px] h-[20px] rounded-full absolute top-0 bg-[#ffffffb1]"></div>
      <div className="w-1/4 h-full bg-[#00acb5d9] py-2 rounded-r-md px-2 overflow-y-scroll ">
        <h1 className="text-3xl font-bold text-center mt-1 ">All Users</h1>
        {data?
          data.map((el, k) => {
            // console.log("el: ",el);
            
            return (
              <motion.div
                key={k}
                initial={{
                // y:-10,
                //   x: -100,
                  opacity: 0,
                  scale:0
                }}
                animate={{
                //   x: 0,
                // y:0,
                  opacity: 1,
                  scale:1
                }}
                transition={{
                  duration: 0.5,
                }}
                
                className="w-full py-2 px-3 bg-[#ffffff4a] text-2xl mt-3 rounded-md"
              >
                <h1>{el.name}</h1>
              </motion.div>
            );
          }):<Loading/>}
      </div>
      <div className="w-3/4 h-full">
      <AllPost/>
      </div>
    </div>
  );
}

export default MainPage;
// bg-linear-to-t from-red-500 via-[#1A1A19]  to-red-500
