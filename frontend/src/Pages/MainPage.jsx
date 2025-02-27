import axios from "axios";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import AllPost from "../Components/AllPost";
import Loading from "../Components/Loading";
import Chat from "../Components/Chat";
import userStore from "../Store/userStore.js";

function MainPage() {
  const [data, setData] = useState(null);
  const [dataFollowing, setDataFollowing] = useState(null);
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
    setUserProfilePicture,
    fromName,
  } = userStore();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const fetchdata = await axios.get(
          `${import.meta.env.VITE_URL}/api/chat/sidebar`,
          {
            withCredentials: true,
          }
        );
        setData(fetchdata.data.follower);
        setDataFollowing(fetchdata.data.following);

        setLoading(false);
        console.log(fetchdata.data.follower);
        console.log(fetchdata.data.following);
      } catch (error) {
        setLoading(false);
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
        setUserProfilePicture(userdata.data.user.profilePic);
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
      <div className="w-1/3 h-full bg-[#00acb5d9] py-2 rounded-r-md px-2 overflow-y-scroll ">
        <h1 className="text-3xl font-bold text-center mt-1 ">All Users</h1>
        {data ? (
          data.map((el, k) => {
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
                className="w-full py-2 px-3 flex gap-3 items-center  hover:bg-black hover:text-white hover:scale-105 transition-all bg-[#ffffff4a] text-2xl mt-3 rounded-md"
              >
                <div className="w-[3vw] h-[5.5vh] overflow-hidden border-[1px]  rounded-full">
                  {console.log(
                    `${
                      import.meta.env.VITE_URL
                    }/uploads/UsersProfilePic/${el.profilePic.split("/").pop()}`
                  )}
                  {el.profilePic && (
                    <img
                      src={`${
                        import.meta.env.VITE_URL
                      }/uploads/UsersProfilePic/${el.profilePic
                        .split("/")
                        .pop()}`}
                      alt="profile pic"
                      className="w-full h-full bg-cover"
                    />
                  )}
                </div>
                <div>
                  <h1>{el.name}</h1>
                </div>
              </motion.div>
            );
          })
        ) : (
          <Loading />
        )}
        {dataFollowing &&
          dataFollowing.map((elem, key) => {
            return (
              <motion.div
                key={key}
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
                  setTo(elem._id);
                  setToName(elem.name);
                  setChat(true);

                  // console.log("to id: ",el._id);
                }}
                className="w-full py-2 px-3 flex gap-3 items-center  hover:bg-black hover:text-white hover:scale-105 transition-all bg-[#ffffff4a] text-2xl mt-3 rounded-md"
              >
                <div className="w-[3vw] h-[5.5vh] overflow-hidden border-[1px]  rounded-full">
                  {elem.profilePic ? (
                    <img
                      src={`${
                        import.meta.env.VITE_URL
                      }/uploads/UsersProfilePic/${elem.profilePic
                        .split("/")
                        .pop()}`}
                      alt="profile pic"
                      className="w-full h-full bg-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <h1>{elem.name}</h1>
                </div>
              </motion.div>
            );
          })}
        {/* {data &&
          data &&
          data.map((el, k) => {
            return (
              <motion.div
                initial={{
                  scaleY: 0,
                }}
                animate={{
                  scaleY: 1,
                }}
                transition={{ duration: 0.5 }}
                key={k}
                className="w-full justify-around bg-[#ffffff3c] items-center gap-4 py-2 relative  overflow-hidden flex  mt-9.5 rounded-lg"
              >
                <div className="h-full  flex gap-2  items-center">
                  <div className="w-[3vw] h-[5.5vh] overflow-hidden border-[1px] border-pink-400 rounded-full">
                    {el.profilePic ? (
                      <img
                        src={`${
                          import.meta.env.VITE_URL
                        }/uploads/UsersProfilePic/${el.profilePic
                          .split("/")
                          .pop()}`}
                        alt="profile pic"
                        className="w-full h-full bg-cover"
                      />
                    ) : null}
                  </div>
                  <div>
                    {" "}
                    <h1 className="text-xl text-red-400">{el.name}</h1>
                    <p className=" overflow-auto ">{el.bio}</p>
                  </div>
                </div>
                <div className="flex gap-7   ">
                  <div>
                    <h1>{el.follower.length}</h1>
                    <span>Followers</span>
                  </div>
                  <div>
                    <h1>{el.following.length}</h1>
                    <span>Following</span>
                  </div>
                  <div>
                    <h1>{el.posts.length}</h1>
                    <span>Posts</span>
                  </div>
                </div>

                {el.follower.includes(fromName) ? (
                  <button
                    onClick={() =>
                      followUser({ id: el._id, otherName: el.name })
                    }
                    className="cursor-pointer bg-green-500 hover:scale-90 px-3 py-1 rounded-md"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      followUser({ id: el._id, otherName: el.name })
                    }
                    className="bg-red-400 cursor-pointer hover:scale-90 px-3 py-1 rounded-md"
                  >
                    Follow
                  </button>
                )}
              </motion.div>
            );
          })} */}
      </div>
      <div className="w-3/4 h-full">{chat ? <Chat /> : <AllPost />}</div>
    </div>
  );
}

export default MainPage;
// bg-linear-to-t from-red-500 via-[#1A1A19]  to-red-500
