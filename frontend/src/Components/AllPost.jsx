import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import userStore from "../Store/userStore";
import axios from "axios";
import Loading from "./Loading";

function AllPost() {
  const { addPost, fromName, setAddPost } = userStore();
  const [file, setFile] = useState(null);
  const [tempImg, setTempImg] = useState(null);
  const [allposts, setAllposts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    subtitle: "",
    captions: "",
  });

  const boxVariants = {
    i: { x: 0, y: 50, scale: 1 },
    s: { x: 0, y: 0, scale: 1, transition: { duration: 0.7 } },
  };

  const fillPostData = (e) => {
    return setPostData({ ...postData, [e.target.name]: e.target.value });
  };
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
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };
    fetchAllPosts();
  }, []);

  const sendFile = async () => {
    if (!file || !postData.title || !postData.subtitle || !postData.captions) {
      return alert("All fields are required");
    }
    try {
      const formData = new FormData();
      formData.append("image", file); // Changed from 'file' to 'image' to match backend
      formData.append("title", postData.title);
      formData.append("subTitle", postData.subtitle);
      formData.append("senderName", fromName);
      formData.append("caption", postData.captions);

      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/main/send`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      window.location.reload();
      console.log("file path", res.data);
      setLoading(true);

    } catch (error) {
      setLoading(true);
      console.log(error.message);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="w-full h-screen relative overflow-y-scroll px-7  flex flex-col justify-between items-end "
    >
      {/* //yeha se lef or right hongs items-start items-end */}
      {loading && <Loading />}
      {allposts &&
        allposts.map((el, k) => (
          <div
            key={k}
            className="w-[40vw] cursor-none py-6 mt-10 bg-[#ffffff35] rounded-md px-2"
          >
            {console.log(el)}
            <div className="flex w-full gap-5 items-center border-b-[1px] pb-2">
              <div className="flex gap-4 items-center">
                <div className="w-[2.5vw] h-[5vh] bg-amber-400 rounded-full"></div>
              </div>
              <div className="flex justify-between items-left flex-col">
                <h1 className="font-bold text-2xl">{el.title}</h1>
                <h3>{el.subTitle}</h3>
              </div>
            </div>
            <div
              onDoubleClick={() => console.log("Liked")}
              className="w-full h-[40vh] cursor-none bg-cover bg-center"
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
            <div className="w-full h-[20%] flex flex-col justify-between">
              <div className="flex-1">{el.captions}</div>
              <div className="flex gap-5 items-center">
                <button className="ml-3 hover:translate-y-[-10px] hover:scale-125 transition-all cursor-pointer">
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
                <button className="ml-5 cursor-pointer hover:translate-y-[-10px] hover:scale-125 transition-all">
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
            </div>
          </div>
        ))}

      {addPost && (
        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          // onAnimationEnd={{
          //   // scale: 0,
          //   opacity:0
          // }}
          transition={{
            duration: 0.5,
          }}
          className="w-[40vw] cursor-default backdrop-blur-xl fixed top-[17%] right-[22%] h-[60vh] mt-3  bg-[#ffffff35] rounded-md px-2  "
        >
          <div className="flex cursor-default  gap-5 items-center border-b-[1px] pb-2 ">
            <div className="flex gap-4  items-center">
              {/* <h1>User name</h1> */}
              <div className="w-[2.5vw] h-[5vh] bg-amber-400 rounded-full"></div>
            </div>
            <div className="flex justify-between items-left flex-col">
              {/* <h1 className="font-bold text-2xl"></h1> */}
              <input
                className="font-bold text-2xl outline-none"
                onChange={fillPostData}
                value={postData.title}
                name="title"
                type="text"
                placeholder="Enter Title"
              />
              {/* <h3>enter sub-title</h3> */}
              <input
                className="outline-none"
                type="text"
                onChange={fillPostData}
                value={postData.subtitle}
                name="subtitle"
                placeholder="Enter sub-title"
              />
            </div>
          </div>
          <div
            // onChange={(e) => {
            //   const file = e.target.files[0];
            //   setFile(file);
            //   // console.log("file : ",file);

            // }}
            onClick={() => {
              document.querySelector("#selectFile").click();
            }}
            onDoubleClick={() => alert("Liked work in progress")}
            className="w-full h-[70%] border-2 relative border-purple-500 flex flex-col items-center justify-center "
          >
            {/* <img
                  src={`${import.meta.env.VITE_URL}/uploads/${el.image
                    .split("/")
                    .pop()}`}
                  alt={el.title}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    console.log("Image load error:", e);
                    e.target.src = "fallback-image-url"; // Optional: provide a fallback image
                  }} */}
            {tempImg ? (
              <img src={`${tempImg}`} alt="Temp image"></img>
            ) : (
              <form encType="multipart/" method="post">
                <input
                  className="hidden"
                  type="file"
                  name="image"
                  id="selectFile"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFile(file);
                    setTempImg(URL.createObjectURL(file));
                    // console.log("file : ",file);
                  }}
                />
              </form>
            )}
            {!tempImg && <h1 className="font-bold mb-3">Select image</h1>}
            {tempImg && (
              <button
                onClick={() => setTempImg("")}
                className="bg-red-500 absolute top-10 cursor-pointer right-10  px-2 py-1 rounded-md text-white text-2xl"
              >
                <svg
                  className="w-[30px] h-[30px]  "
                  viewBox="0 0 14 18"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>delete_forever</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="Icons"
                    stroke="none"
                    stroke-Width=".5px"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="Rounded"
                      transform="translate(-241.000000, -245.000000)"
                    >
                      <g
                        id="Action"
                        transform="translate(100.000000, 100.000000)"
                      >
                        <g
                          id="-Round-/-Action-/-delete_forever"
                          transform="translate(136.000000, 142.000000)"
                        >
                          <g>
                            <polygon
                              id="Path"
                              points="0 0 24 0 24 24 0 24"
                            ></polygon>
                            <path
                              d="M6,19 C6,20.1 6.9,21 8,21 L16,21 C17.1,21 18,20.1 18,19 L18,9 C18,7.9 17.1,7 16,7 L8,7 C6.9,7 6,7.9 6,9 L6,19 Z M9.17,11.17 C9.56,10.78 10.19,10.78 10.58,11.17 L12,12.59 L13.42,11.17 C13.81,10.78 14.44,10.78 14.83,11.17 C15.22,11.56 15.22,12.19 14.83,12.58 L13.41,14 L14.83,15.42 C15.22,15.81 15.22,16.44 14.83,16.83 C14.44,17.22 13.81,17.22 13.42,16.83 L12,15.41 L10.58,16.83 C10.19,17.22 9.56,17.22 9.17,16.83 C8.78,16.44 8.78,15.81 9.17,15.42 L10.59,14 L9.17,12.58 C8.78,12.2 8.78,11.56 9.17,11.17 Z M15.5,4 L14.79,3.29 C14.61,3.11 14.35,3 14.09,3 L9.91,3 C9.65,3 9.39,3.11 9.21,3.29 L8.5,4 L6,4 C5.45,4 5,4.45 5,5 C5,5.55 5.45,6 6,6 L18,6 C18.55,6 19,5.55 19,5 C19,4.45 18.55,4 18,4 L15.5,4 Z"
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
            )}
            {!tempImg && (
              <svg
                className="w-[30%] h-[30%]"
                viewBox="0 0 14 14"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch --> */}
                <title>add post</title>
                <desc>Created with Sketch.</desc>
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Rounded"
                    transform="translate(-411.000000, -1487.000000)"
                  >
                    <g
                      id="Content"
                      transform="translate(100.000000, 1428.000000)"
                    >
                      <g
                        id="-Round-/-Content-/-add"
                        transform="translate(306.000000, 54.000000)"
                      >
                        <g transform="translate(0.000000, 0.000000)">
                          <polygon
                            id="Path"
                            points="0 0 24 0 24 24 0 24"
                          ></polygon>
                          <path
                            d="M18,13 L13,13 L13,18 C13,18.55 12.55,19 12,19 C11.45,19 11,18.55 11,18 L11,13 L6,13 C5.45,13 5,12.55 5,12 C5,11.45 5.45,11 6,11 L11,11 L11,6 C11,5.45 11.45,5 12,5 C12.55,5 13,5.45 13,6 L13,11 L18,11 C18.55,11 19,11.45 19,12 C19,12.55 18.55,13 18,13 Z"
                            id="🔹Icon-Color"
                            fill="#fff"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            )}
          </div>
          <div className="w-full h-[17%] flex flex-col justify-between">
            {/* <div>captions : What's on your mind? Share your thoughts!</div> */}
            <div>
              {" "}
              <textarea
                className="w-full outline-none"
                type="text"
                value={postData.captions}
                onChange={fillPostData}
                name="captions"
                placeholder="Enter captions"
              />
            </div>

            <button
              onClick={() => sendFile()}
              className="w-full py-1 cursor-pointer text-white rounded-xl  bg-[#00acb5d9] text-2xl"
            >
              Upload Now
            </button>
          </div>
        </motion.div>
      )}

      <nav className="w-full sticky  bottom-0 py-1 rounded-t-lg text-2xl bg-[#ffffff21] ">
        <ul className="flex justify-around items-center w-full h-full">
          <motion.li
            initial={boxVariants.i}
            animate={boxVariants.s}
            className="px-3 py-2 border-white border-[1px] rounded-xl "
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 20 17"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch --> */}
              <title>Home</title>
              <desc>Created with Sketch.</desc>
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="Rounded" transform="translate(-816.000000, -289.000000)">
                  <g id="Action" transform="translate(100.000000, 100.000000)">
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
          </motion.li>

          <motion.li
            initial={boxVariants.i}
            animate={boxVariants.s}
            className="px-3 py-2 border-white border-[1px] rounded-xl "
            onClick={() => setAddPost(!addPost)}
          >
            {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->  //create Post  */}
            <svg
              className="w-[30px] h-[30px]"
              viewBox="0 0 14 14"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch --> */}
              <title>add post</title>
              <desc>Created with Sketch.</desc>
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Rounded"
                  transform="translate(-411.000000, -1487.000000)"
                >
                  <g
                    id="Content"
                    transform="translate(100.000000, 1428.000000)"
                  >
                    <g
                      id="-Round-/-Content-/-add"
                      transform="translate(306.000000, 54.000000)"
                    >
                      <g transform="translate(0.000000, 0.000000)">
                        <polygon
                          id="Path"
                          points="0 0 24 0 24 24 0 24"
                        ></polygon>
                        <path
                          d="M18,13 L13,13 L13,18 C13,18.55 12.55,19 12,19 C11.45,19 11,18.55 11,18 L11,13 L6,13 C5.45,13 5,12.55 5,12 C5,11.45 5.45,11 6,11 L11,11 L11,6 C11,5.45 11.45,5 12,5 C12.55,5 13,5.45 13,6 L13,11 L18,11 C18.55,11 19,11.45 19,12 C19,12.55 18.55,13 18,13 Z"
                          id="🔹Icon-Color"
                          fill="#fff"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </motion.li>

          <motion.li
            initial={boxVariants.i}
            animate={boxVariants.s}
            className="px-3  py-2 border-white border-[1px] rounded-xl "
          >
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlnssketch="http://www.bohemiancoding.com/sketch/ns"
            >
              {/* <!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch --> */}
              <title>search</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                sketchtype="MSPage"
              >
                <g
                  id="icon-111-search"
                  sketchtype="MSArtboardGroup"
                  fill="#fff"
                >
                  <path
                    d="M19.4271164,21.4271164 C18.0372495,22.4174803 16.3366522,23 14.5,23 C9.80557939,23 6,19.1944206 6,14.5 C6,9.80557939 9.80557939,6 14.5,6 C19.1944206,6 23,9.80557939 23,14.5 C23,16.3366522 22.4174803,18.0372495 21.4271164,19.4271164 L27.0119176,25.0119176 C27.5621186,25.5621186 27.5575313,26.4424687 27.0117185,26.9882815 L26.9882815,27.0117185 C26.4438648,27.5561352 25.5576204,27.5576204 25.0119176,27.0119176 L19.4271164,21.4271164 L19.4271164,21.4271164 Z M14.5,21 C18.0898511,21 21,18.0898511 21,14.5 C21,10.9101489 18.0898511,8 14.5,8 C10.9101489,8 8,10.9101489 8,14.5 C8,18.0898511 10.9101489,21 14.5,21 L14.5,21 Z"
                    id="search"
                    sketchtype="MSShapeGroup"
                  ></path>
                </g>
              </g>
            </svg>
          </motion.li>
          <motion.li
            initial={boxVariants.i}
            animate={boxVariants.s}
            className="px-3  py-2 border-white border-[1px] rounded-xl "
          >
            <svg
              id="Layer_1"
              dataname="Layer 1"
              className="w-[30px] h-[30px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
            >
              <title>Video Play</title>
              <path
                id="Video_Play"
                dataname="Video Play"
                d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.52,12.52,0,0,0,12.5,0Zm5.26,12.92-8,5A.56.56,0,0,1,9.5,18a.5.5,0,0,1-.24-.06A.51.51,0,0,1,9,17.5V7.5a.51.51,0,0,1,.26-.44.49.49,0,0,1,.51,0l8,5a.49.49,0,0,1,0,.84Z"
                fill="#fff"
              ></path>
            </svg>
          </motion.li>
          <motion.li
            initial={boxVariants.i}
            animate={boxVariants.s}
            className="px-3  py-2 border-white border-[1px] rounded-xl "
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
              fill="#fff"
              // style={{fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;}}
            >
              <g id="Icon">
                <circle cx="12" cy="7" r="5.75"></circle>
                <path d="M21.25,21c-0,0.966 -0.783,1.75 -1.75,1.75l-15,-0c-0.967,-0 -1.75,-0.784 -1.75,-1.75c-0,-4.28 3.47,-7.75 7.75,-7.75l3,0c4.28,0 7.75,3.47 7.75,7.75Zm-0.729,0.729c-0.013,0.005 -0.021,0.011 -0.021,0.021l0.021,-0.021Z"></path>
              </g>
            </svg>
          </motion.li>
        </ul>
      </nav>
    </motion.div>
  );
}

export default AllPost;
