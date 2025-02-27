import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import Loading from "../Components/Loading";
import axios from "axios";
import { motion } from "motion/react";
import userStore from "../Store/userStore";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState(null);
  const { fromName } = userStore();
  const navigator = useNavigate();
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const fetchdata = await axios.get(
          `${import.meta.env.VITE_URL}/api/chat`,
          {
            withCredentials: true,
          }
        );
        setData(fetchdata.data.users);

        console.log(fetchdata.data.users);
        // fetchdata.data.users.forEach((elem, key) => {
        //   if (elem.follower.includes(fromName)) {
        //     setIsUserFollowing(true);
        //   }
        //   return (
        //     <h1 key={key} className="text-8xl text-amber-400">
        //       True
        //     </h1>
        //   );
        // });
      } catch (error) {
        console.log("Error in fetching users", error.message);
      }
    };
    fetchAllUsers();
  }, []);
  useGSAP(() => {
    gsap.from("#d", {
      opacity: 1,
      duration: 0.5,
      y: -100,
      x: -500,
      stagger: 0.2,
      repeat: loading ? -1 : 0,
    });

    gsap.from("#p", {
      opacity: 1,
      duration: 0.5,
      y: -100,
      x: 500,
      stagger: 0.2,
      repeat: loading ? -1 : 0,
    });
  }, []);

  const followUser = async ({ id, otherName }) => {
    // console.log("id: ",id)
    // console.log("othername: ",otherName)

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/main/follow/${id}`,
        { name: fromName, anotherUserName: otherName },
        { withCredentials: true }
      );
      console.log(res.data);
      setLoading(false);

      if (res.data.msg) {
        alert(res.data.msg);
      }
    } catch (error) {
      setLoading(false);

      console.log("Error in following user", error.message);
    }
  };
  const searchUser = async () => {
    // if(search===""){
    //    fetchAllUsers();
    //    return;
    // }
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/main/search/${search}`,
        { withCredentials: true }
      );
      console.log(res.data);
      setSearchRes(res.data.findUser);
      return setLoading(false);
      // if (res.data.msg) {
      //   alert(res.data.msg);
      // }
    } catch (error) {
      setLoading(false);
      console.log("Error in following user", error.message);
    }
  };
  return (
    <div className="w-full h-screen overflow-hidden flex justify-between items-center bg-[#1A1A19]">
      <div className="w-1/4 h-full bg-[#1a1a19c8] overflow-hidden py-4">
        <div
          id="d"
          className="w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 "
        ></div>
        <div
          id="d"
          className="w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 "
        ></div>
        <div
          id="d"
          className="w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 "
        ></div>
        <div
          id="d"
          className="w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 "
        ></div>
        <div
          id="d"
          className="w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 "
        ></div>
        <div
          id="d"
          className="w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 "
        ></div>
        <div
          id="d"
          className="w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 "
        ></div>
        <div
          id="d"
          className="w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 "
        ></div>
      </div>
      <div className="w-2/4 h-full relative text-white">
        <button
          onClick={() => navigator("/")}
          className="px-4 py-1 bg-[#ffffff3c] absolute top-0 left-0 cursor-pointer  rounded-md "
        >
          Back
        </button>
        <div className="w-full py-2 mt-16.5 flex justify-between items-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-2xl px-4 py-3.5 outline-none rounded-l-md bg-[#ffffff3c]"
            type="text"
            placeholder="Search user"
          />
          <button
            onClick={searchUser}
            className="px-3 py-3.5 text-2xl cursor-pointer rounded-md bg-green-500"
          >
            search
          </button>
        </div>

        <div className="w-full h-full overflow-y-scroll">
          {searchRes ? (
            searchRes.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-3xl text-red-400">No results found </h1>
                <button
                  onClick={() => {
                    setSearchRes("");
                  }}
                  className=" px-4 py-2 bg-red-400 rounded-md ml-5 cursor-pointer"
                >
                  All users
                </button>
              </div>
            ) : (
              searchRes.map((elem, key) => {
                return (
                  <motion.div
                    initial={{
                      scaleY: 0,
                    }}
                    animate={{
                      scaleY: 1,
                    }}
                    transition={{ duration: 0.5 }}
                    key={key}
                    className="w-full justify-around bg-[#ffffff3c] items-center gap-4 py-2 relative  overflow-hidden flex  mt-9.5 rounded-lg"
                  >
                    <div className="h-full  flex gap-2  items-center">
                      <div className="w-[3vw] h-[5.5vh] overflow-hidden border-[1px] border-pink-400 rounded-full">
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
                      </div>{" "}
                      <div>
                        <h1 className="text-xl text-red-400">{elem.name}</h1>
                        <p className=" overflow-auto ">{elem.bio}</p>
                      </div>
                    </div>
                    <div className="flex gap-7   ">
                      <div>
                        <h1>{elem.follower.length}</h1>
                        <span>Followers</span>
                      </div>
                      <div>
                        <h1>{elem.following.length}</h1>
                        <span>Following</span>
                      </div>
                      <div>
                        <h1>{elem.posts.length}</h1>
                        <span>Posts</span>
                      </div>
                    </div>

                    {elem.follower.includes(fromName) ? (
                      <button
                        onClick={() =>
                          followUser({ id: elem._id, otherName: elem.name })
                        }
                        className="cursor-pointer bg-green-500 hover:scale-90 px-3 py-1 rounded-md"
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          followUser({ id: elem._id, otherName: elem.name })
                        }
                        className="bg-red-400 cursor-pointer hover:scale-90 px-3 py-1 rounded-md"
                      >
                        Follow
                      </button>
                    )}
                  </motion.div>
                );
              })
            )
          ) : (
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
            })
          )}
        </div>

        {/* {loading && <Loading />} */}
      </div>
      <div className="w-1/4 h-full bg-[#1a1a19c8] overflow-hidden py-4">
        <div
          id="p"
          className="w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 "
        ></div>
        <div
          id="p"
          className="w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 "
        ></div>
        <div
          id="p"
          className="w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 "
        ></div>
        <div
          id="p"
          className="w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 "
        ></div>
        <div
          id="p"
          className="w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 "
        ></div>
        <div
          id="p"
          className="w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 "
        ></div>
        <div
          id="p"
          className="w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 "
        ></div>
        <div
          id="p"
          className="w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 "
        ></div>
      </div>
    </div>
  );
}

export default SearchPage;
