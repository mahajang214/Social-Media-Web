import React, { useEffect, useState } from "react";
import userStore from "../Store/userStore";
import axios from "axios";
import Loading from "./Loading";
import { motion } from "motion/react";

function Chat() {
  const { from, to, fromName, toName,setLoad } = userStore();
  const [allMessages, setAllMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const fetchAllMessages=async () => {
        try {
setLoading(true);
            const messages=await axios.get(`${import.meta.env.VITE_URL}/api/chat/recieve/${to}`,{withCredentials:true});
            setAllMessages(messages.data);
setLoading(false);

            console.log(messages.data);
        } catch (error) {
            console.log(error.message);
            
        }
    }
    fetchAllMessages();
  },[to]);

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="w-full text-2xl py-2 px-3  border-b-[1px]">
        <h1>{toName}</h1>
      </nav>
      <div className="w-full h-[90%] p-4 overflow-y-scroll border-b-[1px]">
    {allMessages ? allMessages.length > 0 ?
          allMessages.map((el, k) => {
            // console.log("el", el);
            // console.log(Boolean(to===el.from));  //to ===el.from
            if (to === el.from) {
              return (
                <div id='messageCommingFromBackendTo' className="w-full flex justify-start items-start">
                  <div className={` relative  px-2 py-4  rounded-tr-xl rounded-b-xl rounded-tl-0 mt-3   bg-[#f8f8f861] overflow-hidden `}>
                    <h3 className="text-white ">{el.text}</h3>
                    <p className="absolute top-[0px] text-[#ffd608] text-md" >{toName}</p>
                    <p className="absolute bottom-0 right-[1px] text-[#ffffffb4] text-sm">{new Date(el.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              )

            }
            else {


              return (
                //to wali div'
                <div id='messageCommingFromBackendFrom' className="w-full flex justify-end  items-end">
                  <div key={k}
                    className={`  relative  px-2 py-4 rounded-tl-xl rounded-b-xl rounded-tr-0 mt-3   bg-[#f8f8f861] overflow-hidden `}>

                    <h3 className={`text-white text-right`} >{el.text}</h3>
                    <p className={`absolute top-[0px] text-lg text-pink-600 right-[10px]`} >{fromName}</p>
                    <p className={`absolute bottom-0 left-[1px]  text-[#ffffffb4] text-sm`}>{new Date(el.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              )
            }
          }):(<div className="w-full h-full flex justify-center items-center">
            <motion.h1 initial={{
                opacity: 0,
                y: 100,

            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{duration:.5}}
             className="text-2xl">Conversation not started yet...</motion.h1>
          </div>)
           : <Loading />}
          {loading&&<Loading/>}
      </div>
      <div className="w-full h-[10%  flex items-center ">
        <input
          type="text"
          className="w-full py-2 outline-none px-2 text-xl"
          placeholder="Hey there type something"
        />
        <button className="px-3 cursor-pointer "  >
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
            <path
            
              d="M26,4L13,20v7.3c0,0.9,1.2,1.4,1.8,0.7L19,23"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Chat;
