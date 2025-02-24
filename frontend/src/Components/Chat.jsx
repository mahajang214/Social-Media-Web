import React, { useEffect, useRef, useState } from "react";
import userStore from "../Store/userStore";
import axios from "axios";
import Loading from "./Loading";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { io } from "socket.io-client";
function Chat() {
  const { from, to, fromName, toName, setLoad, setChat,setOnlineUsers,onlineUsers } = userStore();
  const [allMessages, setAllMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState("");
  const [menuAnime, setMenuAnime] = useState(false);
  // const clientSocket=io(`${import.meta.env.VITE_URL}`);
  const msgRef=useRef(null);

  const socket = useRef(null);
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        setLoading(true);
        const messages = await axios.get(
          `${import.meta.env.VITE_URL}/api/chat/recieve/${to}`,
          { withCredentials: true }
        );
        setAllMessages(messages.data.messages);
        setLoading(false);
        console.log(messages.data.messages);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllMessages();
    socket.current = io(`${import.meta.env.VITE_URL}`, {
      withCredentials: true,
    });

    socket.current.on("newMessage", (msg) => {

      setAllMessages(prev=>[...prev, msg]);
      // console.log("msg : ",msg);
      
    });
    socket.current.on('onUsers',data=>{
      // setOnlineUsers(data);
      // copyFn(data);
      // console.log("",data," is online");
      
    });

    socket.current.emit('onUsers',fromName);


    // console.log("online users : ",onlineUsers);

    


    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [to]);
  useEffect(()=>{
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  },[allMessages])
  const sendMessage = async () => {
    if(inputData===''){
      alert('Please enter a message');
      return;
    }
    try {
      setLoading(true);
      // console.log("TO id :", to);
      socket.current.emit("newMessage", {
        from,
        to,
        text: inputData,
        image: null,
      });
      const send = await axios.post(
        `${import.meta.env.VITE_URL}/api/chat/send/${to}`,
        { from, to, text: inputData, image: null },
        { withCredentials: true }
      );
      // setAllMessages((prev) => [...prev, send.data.newMessage]);
      setLoading(false);
      return setInputData("");
      // console.log(send.data.newMessage);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      return;
    }
  };
  useGSAP(() => {
    gsap.from("#mbtn", {
      x: 500,
      duration: 1,
      stagger: 0.2,
    });
  }, [menuAnime]);

  return (
    <motion.div
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="w-full h-full flex flex-col"
    >
      <nav className="w-full text-2xl py-2 px-3 flex justify-between items-center  border-b-[1px]">
        <h1>{toName}</h1>
        <div className="px-2">
          <button
            id="menuBtn"
            onClick={() => setMenuAnime(!menuAnime)}
            onMouseEnter={() => {
              const line = document.querySelectorAll("#lines");
              line.forEach((element) => {
                element.style.width = "30px";
              });
            }}
            onMouseLeave={() => {
              const line = document.querySelectorAll("#lines");
              line.forEach((element) => {
                element.style.width = "15px";
              });
            }}
            className=" w-[30px]  h-[30px]  cursor-pointer"
          >
            <div className="w-full  flex justify-end items-center">
              <div
                id="lines"
                className="w-[15px] transition-all h-[5px] bg-[#00acb5d9] rounded-full mb-1 text-white"
              ></div>
            </div>
            <div className="w-full flex justify-center">
              <div
                id="lines"
                className="w-[15px] transition-all h-[5px] bg-[#00acb5d9] rounded-full text-white"
              ></div>
            </div>{" "}
            <div
              id="lines"
              className={`w-[15px] transition-all h-[5px] bg-[#00acb5d9] rounded-full mt-1 text-white`}
            ></div>
          </button>
        </div>
      </nav>
      <div className="w-full relative h-[90%] p-4 overflow-y-scroll overflow-x-hidden border-b-[1px]">
        {allMessages ? (
          allMessages.length > 0 ? (
            allMessages.map((el, k) => {
              // console.log("el", el);
              // console.log("to===el.from",Boolean(to===el.from));  //to ===el.from
              if (to === el.from) {
                return (
                  <div
                    id="messageCommingFromBackendTo"
                    className="w-full flex justify-start items-start"
                    key={k}
                  >
                    <div
                      className={` relative  px-2 py-4  rounded-tr-xl rounded-b-xl rounded-tl-0 mt-3   bg-[#f8f8f861] overflow-hidden `}
                    >
                      <h3 className="text-white ">{el.text}</h3>
                      <p className="absolute top-[0px] text-[#ffd608] text-md">
                        {toName}
                      </p>
                      <p className="absolute bottom-0 right-[1px] text-[#ffffffb4] text-sm">
                        {new Date(el.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  //to wali div'
                  <div
                    id="messageCommingFromBackendFrom"
                    className="w-full flex justify-end  items-end"
                  >
                    <div
                      key={k}
                      className={`  relative  px-2 py-4 rounded-tl-xl rounded-b-xl rounded-tr-0 mt-3   bg-[#f8f8f861] overflow-hidden `}
                    >
                      <h3 className={`text-white text-right`}>{el.text}</h3>
                      <p
                        className={`absolute top-[0px] text-xm text-[#00acb5d9] right-[10px]`}
                      >
                        {fromName}
                      </p>
                      <p
                        className={`absolute bottom-0 left-[1px]  text-[#ffffffb4] text-sm`}
                      >
                        {new Date(el.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 100,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ duration: 0.5 }}
                className="text-2xl"
              >
                Conversation not started yet...
              </motion.h1>
            </div>
          )
        ) : (
          <Loading />
        )}
        <div ref={msgRef}></div>
        {loading && <Loading />}
        {menuAnime && (
          <motion.div
            initial={{
              x: 500,
            }}
            animate={{
              x: 0,
            }}
            transition={{ duration: 0.5 }}
            className="absolute backdrop-blur-xs cursor-context-menu top-0 right-0 w-[30vh] h-full bg-[#00acb5d9] "
          >
            <button
              id="mbtn"
              onClick={() => setChat(false)}
              className="w-full py-2 text-2xl flex justify-center items-center  bg-[#ffffff31] rounded-xl mt-5 cursor-pointer "
            >
              {/* //home */}
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 20 17"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                // className="items-center"
              >
                {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch --> */}
                <title>home</title>
                <desc>Created with Sketch.</desc>
                <g
                  id="Icons"
                  stroke="#000"
                  strokeWidth=".5px"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Rounded"
                    transform="translate(-816.000000, -289.000000)"
                  >
                    <g
                      id="Action"
                      transform="translate(100.000000, 100.000000)"
                    >
                      <g
                        id="-Round-/-Action-/-home"
                        transform="translate(714.000000, 186.000000)"
                      >
                        <g transform="translate(0.000000, 0.000000)">
                          <polygon
                            id="Path"
                            points="0 0 24 0 24 24 0 24"
                          ></polygon>
                          <path
                            d="M10,19 L10,14 L14,14 L14,19 C14,19.55 14.45,20 15,20 L18,20 C18.55,20 19,19.55 19,19 L19,12 L20.7,12 C21.16,12 21.38,11.43 21.03,11.13 L12.67,3.6 C12.29,3.26 11.71,3.26 11.33,3.6 L2.97,11.13 C2.63,11.43 2.84,12 3.3,12 L5,12 L5,19 C5,19.55 5.45,20 6,20 L9,20 C9.55,20 10,19.55 10,19 Z"
                            id="🔹Icon-Color"
                            fill="#fff"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <button
              id="mbtn"
              className="w-full py-2 text-2xl flex justify-center   bg-[#ffffff31] rounded-xl mt-5 cursor-pointer "
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlSpace="preserve"
                xmlnsserif="http://www.serif.com/"
                stroke="#000"
                strokeWidth={".5px"}
                fill="#fff"
                // style={{fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;}}
              >
                <g id="Icon">
                  <circle cx="12" cy="7" r="5.75"></circle>
                  <path d="M21.25,21c-0,0.966 -0.783,1.75 -1.75,1.75l-15,-0c-0.967,-0 -1.75,-0.784 -1.75,-1.75c-0,-4.28 3.47,-7.75 7.75,-7.75l3,0c4.28,0 7.75,3.47 7.75,7.75Zm-0.729,0.729c-0.013,0.005 -0.021,0.011 -0.021,0.021l0.021,-0.021Z"></path>
                </g>
              </svg>
            </button>

            <button
              id="mbtn"
              className="w-full py-1 text-2xl flex justify-center bg-red-500 text-white cursor-pointer   rounded-xl mt-5 "
            >
              <svg
                className="w-[40px] h-[40px]"
                stroke="#000"
                strokeWidth={".5px"}
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <title>Logout</title>
                <g id="Logout">
                  <g id="Logout-2" data-name="Logout">
                    <path d="M256,73.8247a182.18,182.18,0,0,0-182.18,182.18c0,100.6173,81.567,182.1708,182.18,182.1708a182.1753,182.1753,0,1,0,0-364.3506Zm-18.0963,86.2209a18.0986,18.0986,0,0,1,36.1971,0V214.02a18.0986,18.0986,0,0,1-36.1971,0ZM256,348.5884a92.4129,92.4129,0,0,1-32.9634-178.7517v33.381a62.4533,62.4533,0,1,0,65.9313,0v-33.381A92.4149,92.4149,0,0,1,256,348.5884Z"></path>
                  </g>
                </g>
              </svg>
            </button>
          </motion.div>
        )}
      </div>
      <div className="w-full h-[10%  flex items-center ">
        <input
          onChange={(e) => setInputData(e.target.value)}
          type="text"
          className="w-full py-2 outline-none px-2 text-xl"
          placeholder="Hey there type something"
          value={inputData}
        />
        <button onClick={sendMessage} className="px-3 cursor-pointer ">
          <svg
            version="1.1"
            id="Icons"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            fill="#00acb5d9"
            stroke="#000"
            className="w-[30px] h-[30px]"
          >
            <path
              d="M26.4,2.9L3.8,15c-0.7,0.4-0.7,1.5,0.1,1.8l20.8,8.7c0.6,0.3,1.3-0.2,1.4-0.8l1.7-20.8
	C27.9,3,27.1,2.5,26.4,2.9z"
            ></path>
            <path d="M26,4L13,20v7.3c0,0.9,1.2,1.4,1.8,0.7L19,23"></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default Chat;
