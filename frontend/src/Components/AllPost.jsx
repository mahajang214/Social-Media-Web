import React from "react";
import YBar from "./YBar";
import { motion } from "motion/react";

function AllPost() {
  return (
    <motion.div
    initial={{
      opacity:0
    }}
    animate={{
      opacity:1
      }}
      transition={{
        duration: 0.5
      }} className="w-full h-screen overflow-scroll  flex flex-col justify-between items-end "> 
    {/* //yeha se lef or right hongs items-start items-end */}
     
        <div className="w-[40vw] h-[60vh] mt-3  bg-[#ffffff35] rounded-md px-2  ">
          <div className="flex  gap-5 items-center border-b-[1px] pb-2 ">
            <div className="flex gap-4  items-center">
              {/* <h1>User name</h1> */}
              <div className="w-[2.5vw] h-[5vh] bg-amber-400 rounded-full"></div>
            </div>
            <div className="flex justify-between items-left flex-col">
              <h1 className="font-bold text-2xl">Title</h1>
              <h3>sub title</h3>
            </div>
          </div>
          <div onDoubleClick={()=>console.log("Liked")
          } className="w-full h-[70%] bg-purple-500 "></div>
          <div className="w-full h-[17%] flex flex-col justify-between">
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
              est praesentium dolor veritatis minus quis necessitatibus illo
              debitis consequatur facere nihil unde fuga dicta more...
            </div>
            <div  className="gap-5 items-center ">
              <button  className="ml-3 hover:translate-y-[-10px] hover:scale-125 transition-all cursor-pointer">
                {true?<svg
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
                </svg>:<svg
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
                </svg>}
                <span  className="text-gray-200">50K </span>
              </button>
              <button  className="ml-5 cursor-pointer hover:translate-y-[-10px] hover:scale-125 transition-all">
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
                <span className="text-gray-200">20</span>
              </button>
            </div>
          </div>
        </div>
     
        
        
      
      <YBar />
    </motion.div>
  );
}

export default AllPost;
