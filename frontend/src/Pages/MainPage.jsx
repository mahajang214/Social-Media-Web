import axios from "axios";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import AllPost from "../Components/AllPost";
import Loading from "../Components/Loading";
import Chat from "../Components/Chat";
import userStore from "../Store/userStore.js";

function MainPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userdata, setUserData] = useState(null);
  // const [isOn, setIsOn] = useState(false);
  const {
    setUser,
    setFrom,
    setTo,
    setEmail,
    setFollower,
    setFollowing,
    setPosts,
    from,
    to,
    setToName,
    setFromName,
    load,
    chat,
    setChat,
    onlineUsers,
  } = userStore();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const fetchdata = await axios.get(
          `${import.meta.env.VITE_URL}/api/chat`,
          {
            withCredentials: true,
          }
        );
        setData(fetchdata.data.users);
        setLoading(false);
        // console.log(fetchdata.data.users);
      } catch (error) {
        console.log("Error in fetching users", error.message);
      }
    };
    fetchAllUsers();
    const fetchUser = async () => {
      try {
        const userdata = await axios.get(
          `${import.meta.env.VITE_URL}/api/chat/user`,
          { withCredentials: true }
        );
        // console.log(userdata.data.user);
        setFrom(userdata.data.user._id);
        setEmail(userdata.data.user.email);
        setFollower(userdata.data.user.follower);
        setFollowing(userdata.data.user.following);
        setPosts(userdata.data.user.posts);
        setFromName(userdata.data.user.name);
        // console.log('from:',  from,"to:",to,"name:",user,"post:",posts,"follower:",follower,"following:",following);
      } catch (error) {
        console.log("error in fetching user data", error);
      }
    };
    fetchUser();
  }, []);
  // useEffect(() => {

  // }, []);

  const cursorAnimation = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    const dot = document.querySelector("#dot");
    dot.style.left = x + "px";
    dot.style.top = y + "px";
  };

  return (
    <div
      onMouseMove={cursorAnimation}
      className="w-full relative cursor-none transition-all h-screen bg-[#1A1A19] px-5 text-white flex justify-between items-center"
    >
      <div
        id="dot"
        className="w-[20px] h-[20px] rounded-full absolute top-0 bg-[#ffffffb1]"
      >
        {load ? load : null}
      </div>
      <div className="w-1/4 h-full bg-[#00acb5d9] py-2 rounded-r-md px-2 overflow-y-scroll ">
        <h1 className="text-3xl font-bold text-center mt-1 ">All Users</h1>
        {data ? (
          data.map((el, k) => {
            // for (let i = 0; i < onlineUsers.length; i++) {
              // let element = onlineUsers[i];
              // console.log("",i,"online array : ",element);
              // console.log(Boolean(element===el.name));
              
              // if(onlineUsers[i]===el.name){
              //   setIsOn(true);
              //   // console.log("ye chal gaya");
                
              // }
            // }
            // console.log("onlineusers.id===el.name :",Boolean(onlineUsers.id==el.name));
              // console.log("online users ID :",onlineUsers);
              // console.log("el name :",el.name);


            
           
            return (
              <motion.div
                key={k}
                initial={{
                  // y:-10,
                  //   x: -100,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  //   x: 0,
                  // y:0,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                }}
                onClick={() => {
                  setTo(el._id);
                  setToName(el.name);
                  setChat(true);

                  // console.log("to id: ",el._id);
                }}
                className="w-full py-2 px-3 flex justify-between  hover:bg-black hover:text-white hover:scale-105 transition-all bg-[#ffffff4a] text-2xl mt-3 rounded-md"
              >
                <h1>{el.name}</h1>
              {/* {isOn&&<h3>online</h3>} */}
              {/* <h3>online</h3> */}
              </motion.div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      <div className="w-3/4 h-full">{chat ? <Chat /> : <AllPost />}</div>
    </div>
  );
}

export default MainPage;
// bg-linear-to-t from-red-500 via-[#1A1A19]  to-red-500
