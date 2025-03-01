import React, { useState, useEffect, useRef } from "react";
import userStore from "../Store/userStore";
import Loading from "../Components/Loading";
import axios from "axios";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import { io } from "socket.io-client";
function Allposts() {
  const [allposts, setAllposts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { fromName } = userStore();
  const navigator = useNavigate();
  const ioRef = useRef(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/main`,
          { withCredentials: true }
        );
        setAllposts(response.data.allposts);
        setLoading(false);
        // console.log("comment text",allposts.comments)
        // console.log("commented by ",response.data.allposts.comments.commentedBy)
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };
    fetchAllPosts();
    
    ioRef.current = io(`${import.meta.env.VITE_URL}`, {
      withCredentials: true,
    });

    ioRef.current.on("sendComment", (sendedComment) => {
      console.log("socket Data :",sendedComment);
    });

    return () => {
      if (ioRef.current) {
        ioRef.current.disconnect();
      }
    };
  }, []);

  const like = async (id) => {
    // console.log(id)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/main/like/${id}`,
        { likedBy: fromName },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
            "Access-Control-Allow-Methods": "GET, POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          withCredentials: true,
        }
      );
      alert(`${res.data.msg}`);
      console.log(res.data);
    } catch (error) {
      alert(`${error.messages}`);
      console.log(error.message);
    }
  };
  const sendComment = async (id) => {
    try {
      setLoading(true);
      ioRef.current.emit("sendComment", { commentData: commentText, name: fromName });
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/main/comment/${id}`,
        { commentData: commentText, name: fromName },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      alert("comment posted ");
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scaleY: 0,
      }}
      animate={{
        opacity: 1,
        scaleY: 1,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-screen bg-[#1A1A19] overflow-hidden  relative flex-col flex justify-start items-center text-white"
    >
      <div className="w-2/3 flex-grow py-5 mb-1 flex justify-start items-center flex-col overflow-y-auto">
        {loading && <Loading />}
        {allposts &&
          allposts.map((el, k) => (
            <div
              key={k}
              className="w-[40vw]  bg-[#ffffff35]  py-6 mb-10 rounded-md px-2"
            >
              <div className="flex w-full  gap-5 items-center border-b-[1px] pb-2">
                <div className="flex gap-4  items-center">
                  <div className="w-[2.5vw]  h-[5vh] bg-cover overflow-hidden bg-amber-400 rounded-full">
                    {el.userPic ? (
                      <img
                        src={`${
                          import.meta.env.VITE_URL
                        }/uploads/UsersProfilePic/${el.userPic
                          .split("/")
                          .pop()}`}
                        alt="profile pic"
                        className="w-full h-full bg-cover"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-between items-left flex-col">
                  <h1 className="font-bold text-2xl">{el.title}</h1>
                  <h3>{el.subTitle}</h3>
                </div>
              </div>
              <div
                onDoubleClick={() => like(el._id)}
                className="w-full h-[60vh] bg-cover bg-center"
              >
                {el.image && (
                  <img
                    src={`${import.meta.env.VITE_URL}/uploads/${el.image
                      .split("/")
                      .pop()}`}
                    alt={el.title}
                    className="w-full cursor-default h-full object-cover rounded-md"
                    onError={(e) => {
                      console.log("Image load error:", e);
                      e.target.src = "fallback-image-url"; // Optional: provide a fallback image
                    }}
                  />
                )}
              </div>
              <div className="w-full h-[15%]  flex flex-col justify-between">
                <div className="flex-1">{el.captions}</div>
                <div className="flex  gap-5 items-center">
                  <button
                    onClick={(e) => {
                      // setPostId(el._id);
                      like(el._id);
                      // console.log("el id :",el._id);
                    }}
                    className="ml-3 hover:translate-y-[-10px] hover:scale-125 transition-all cursor-pointer"
                  >
                    {true ? (
                      <svg
                        className="w-[30px] h-[30px]"
                        version="1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        enableBackground="new 0 0 48 48"
                      >
                        <path
                          fill="#2C3930"
                          stroke="#fff"
                          d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-[30px] h-[30px]"
                        version="1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        enableBackground="new 0 0 48 48"
                      >
                        <path
                          fill="#050505"
                          stroke="#fff"
                          d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"
                        ></path>
                      </svg>
                    )}
                    <span className="text-gray-200">{el.like.length} </span>
                  </button>
                  <button
                    onClick={() => setOpenComment(!openComment)}
                    className="ml-5 cursor-pointer hover:translate-y-[-10px] hover:scale-125 transition-all"
                  >
                    <svg
                      version="1.1"
                      className="w-[25px] h-[25px]"
                      fill="#fff"
                      id="Icons"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M19,2H5C3.3,2,2,3.3,2,5v17c0,0.4,0.2,0.7,0.5,0.9C2.7,23,2.8,23,3,23c0.2,0,0.4-0.1,0.5-0.2L11,18h8c1.7,0,3-1.3,3-3V5
	C22,3.3,20.7,2,19,2z M10,13H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S10.6,13,10,13z M13,9H8C7.4,9,7,8.6,7,8s0.4-1,1-1h5
	c0.6,0,1,0.4,1,1S13.6,9,13,9z"
                      ></path>
                      <path
                        d="M27,9h-3v6c0,2.8-2.2,5-5,5h-7.4L10,21v1c0,1.7,1.3,3,3,3h8l7.5,4.8c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.3,0,0.5-0.1
	c0.3-0.2,0.5-0.5,0.5-0.9V12C30,10.3,28.7,9,27,9z"
                      ></path>
                    </svg>
                    <span className="text-gray-200">{el.comments.length}</span>
                  </button>
                </div>

                {openComment && (
                  <motion.div
                    initial={{
                      scaleY: 0,
                    }}
                    animate={{
                      scaleY: 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full relative  h-[30vh]  "
                  >
                    <h4 className="text-center ">Comments</h4>
                    <div className="w-full overflow-auto h-full">
                      {el.comments.map((elem, i) => (
                    // console.log("Elem : ",elem)
                         ( <div
                          key={i}
                          className="text-xl mt-3 bg-[#00000070] px-2 py-1 rounded-md border-2"
                        >
                          <h3 className="text-purple-500 underline">
                            {elem.commentedBy}
                          </h3>
                          <h4 className="w-full h-[6vh] overflow-auto">
                            {elem.text}
                          </h4>
                        </div>)
                      ))}
                      <div className="w-full flex justify-between items-center sticky bottom-0 py-1">
                        <input
                          onChange={(e) => setCommentText(e.target.value)}
                          type="text"
                          placeholder="Write a comment"
                          className="w-full outline-none p-2 rounded-l-xl bg-[#fafafa3b]"
                        />
                        <button
                          onClick={() => {
                            sendComment(el._id);
                          }}
                          className="px-3  py-2 rounded-r-xl bg-[#34de21a1]"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
      </div>
      <NavigationBar cl={`sticky bottom-0`} />
    </motion.div>
  );
}

export default Allposts;
