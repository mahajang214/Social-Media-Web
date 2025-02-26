import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import Loading from "../Components/Loading";
import axios from "axios";
import { motion } from "motion/react";

function SearchPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [isOn, setIsOn] = useState(false);

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
        console.log(fetchdata.data.users);
      } catch (error) {
        setLoading(false);

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
    });

    gsap.from("#p", {
      opacity: 1,
      duration: 0.5,
      y: -100,
      x: 500,
      stagger: 0.2,
    });
  }, []);

  // useEffect(() => {
  //   if (loading) {
  //     gsap.from("#d", {
  //       opacity: 1,
  //       duration: 0.5,
  //       y: -100,
  //       x: -500,
  //       stagger: 0.2,
  //       repeat: -1,
  //     });
  //     gsap.from("#p", {
  //       opacity: 1,
  //       duration: 0.5,
  //       y: -100,
  //       x: 500,
  //       stagger: 0.2,
  //       repeat: -1,
  //     });
  //   }
  // }, [loading]);

  const followUser = async () => {};

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
      <div className="w-2/4 h-full text-white">
        <div className="w-full py-2 mt-16.5 flex justify-between items-center">
          <input
            className="w-full text-2xl px-4 py-3.5 outline-none rounded-l-md bg-[#ffffff3c]"
            type="text"
            placeholder="Search user"
          />
          <button className="px-3 py-3.5 text-2xl cursor-pointer rounded-md bg-green-500">
            search
          </button>
        </div>

        <div className="w-full h-full overflow-y-scroll">
          {data &&
            data.map((el, k) => {
              return (
                <div
                  key={k}
                  className="w-full justify-around bg-[#ffffff3c] items-center gap-4 py-2 relative  overflow-hidden flex  mt-9.5 rounded-lg"
                >
                  <div className="h-full  ">
                    <h1 className="text-xl text-red-400">{el.name}</h1>
                    <p className=" overflow-auto ">{el.bio}</p>
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

                  <button className="bg-red-400 px-3 py-1  rounded-md">
                    Follow
                  </button>
                </div>
              );
            })}
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
// {data ? (
//     data.map((el, k) => {
//       return (
//         <motion.div
//           key={k}
//           initial={{
//             // y:-10,
//             //   x: -100,
//             opacity: 0,
//             scale: 0,
//           }}
//           animate={{
//             //   x: 0,
//             // y:0,
//             opacity: 1,
//             scale: 1,
//           }}
//           transition={{
//             duration: 0.5,
//           }}
//           onClick={() => {
//             setTo(el._id);
//             setToName(el.name);
//             setChat(true);

//             // console.log("to id: ",el._id);
//           }}
//           className="w-full py-2 px-3 flex justify-between  hover:bg-black hover:text-white hover:scale-105 transition-all bg-[#ffffff4a] text-2xl mt-3 rounded-md"
//         >
//           <h1>{el.name}</h1>
//           {/* {isOn&&<h3>online</h3>} */}
//           {/* <h3>online</h3> */}
//         </motion.div>
//       );
//     })
//   ) : (
//     <Loading />
//   )}
