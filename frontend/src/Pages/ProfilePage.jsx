import axios from "axios";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [data, setData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSecretClicked, setIsSecretClicked] = useState(false);
  const [key, setKey] = useState("");
  const [file, setFile] = useState(null);
  const [tempPic, setTempPic] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${import.meta.env.VITE_URL}/api/chat/user`, {
          withCredentials: true,
        });
        setData(res.data.user);
        setEditedName(res.data.user.name);
        setEditedBio(res.data.user.bio);
        if (data && data.userLoginSecretKey) {
          setKey(data.userLoginSecretKey);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const sendUserSecretKey = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/auth/setloginkey`,
        { withCredentials: true }
      );
      console.log(res.data.hashLoginSecret);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfilePic = async () => {
    if (!file) {
      alert("Please select a image first");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/setprofilepic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      // alert("working")
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/setinputs`,
        {
          name: editedName,
          bio: editedBio
        },
        {
          withCredentials: true
        }
      );
      console.log(res.data);
      setData({ ...data, name: editedName, bio: editedBio });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
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
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center text-white items-center h-screen bg-[#1A1A19]"
    >
      <div className="w-2/3 py-5 rounded-lg px-4  bg-[#ffffff20] ">
        <h1 className="text-7xl  text-center">Profile </h1>
        <div className="w-full py-4 flex justify-between relative items-center">
          <div className="w-1/2 h-full flex relative justify-center items-center ">
            <div className="w-[15vw] h-[30vh] bg-cover  rounded-full border-2 overflow-hidden bg-pink-500">
              {tempPic ? (
                <img
                  src={tempPic}
                  alt="profile pic"
                  className="w-full h-full bg-cover"
                />
              ) : null}
              {data.profilePic ? (
                <img
                  src={`${
                    import.meta.env.VITE_URL
                  }/uploads/UsersProfilePic/${data.profilePic
                    .split("/")
                    .pop()}`}
                  alt="profile pic"
                  className="w-full h-full bg-cover"
                />
              ) : null}
            </div>

            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
                setTempPic(URL.createObjectURL(file));
              }}
              className="hidden"
              type="file"
              name="image"
              id="selectFile"
            />
            <div
              onClick={() => document.querySelector("#selectFile").click()}
              className="absolute bottom-0  cursor-pointer right-[20%]  w-[7.5vw] h-[15vh] rounded-full "
            >
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
              >
                <g id="Layer_35" dataname="Layer 35">
                  <path d="M32,10.5A21.52,21.52,0,0,0,10.5,32c1.18,28.52,41.82,28.51,43,0A21.52,21.52,0,0,0,32,10.5Zm13.07,23H33.5V45.07a1.5,1.5,0,0,1-3,0V33.5H18.93a1.5,1.5,0,0,1,0-3H30.5V18.93a1.5,1.5,0,0,1,3,0V30.5H45.07A1.5,1.5,0,0,1,45.07,33.5Z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center ">
            <div className="w-full h-full flex justify-start gap-12 ">
              <div className="gap-6">
                <h1 className="text-7xl">{data && data.follower.length}</h1>
                <span className="text-3xl">Followers</span>
              </div>
              <div className="gap-6">
                <h1 className="text-7xl">{data && data.following.length}</h1>
                <span className="text-3xl">Following</span>
              </div>
              <div className="gap-6">
                <h1 className="text-7xl">{data && data.posts.length} </h1>
                <span className="text-3xl">Posts</span>
              </div>
            </div>
          </div>
        </div>
        {tempPic && (
          <button
            onClick={updateProfilePic}
            className=" w-1/2 text-2xl cursor-pointer font-bold bg-purple-500 py-1 rounded-md"
          >
            Update Now
          </button>
        )}

        <form
          onSubmit={handleSaveChanges}
          className="py-2 border-2 px-2 mt-2 rounded-2xl relative"
          method="post"
        >
          {isEditing ? (
            <input
              className="w-full text-2xl px-4 py-2 mt-14 bg-[#ffffff33] rounded-full outline-none"
              id="name"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            <input
              className="w-full text-2xl px-4 py-2 mt-14 bg-[#ffffff33] rounded-full outline-none"
              id="name"
              disabled
              type="text"
              value={data && data.name}
            />
          )}
          <input
            className="w-full text-2xl px-4 py-2 mt-4 bg-[#ffffff33] rounded-full outline-none"
            disabled
            type="text"
            value={data && data.email}
          />
          {isEditing ? (
            <input
              className="w-full text-2xl px-4 py-2 mt-4 bg-[#ffffff33] rounded-full outline-none"
              type="text"
              id="bio"
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
            />
          ) : (
            <input
              className="w-full text-2xl px-4 py-2 mt-4 bg-[#ffffff33] rounded-full outline-none"
              type="text"
              id="bio"
              disabled
              value={data && data.bio}
            />
          )}
          <input
            className="w-full text-2xl px-4 py-2 mt-4 bg-[#ffffff33] rounded-full outline-none"
            disabled
            type="text"
            value={
              "Account is activated from " +
              new Date(data && data.createdAt).toLocaleDateString() +
              " at " +
              new Date(data && data.createdAt).toLocaleTimeString()
            }
          />

          {isEditing && (
            <button
              type="submit"
              className="absolute w-[40px] cursor-pointer bg-green-500 h-[40px] top-3 rounded-md right-16 text-2xl"
            >
              ✓
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(!isEditing);
            }}
            className="absolute w-[40px] cursor-pointer bg-[#ffffff33] h-[40px] top-3 rounded-md right-5 text-2xl"
          >
            <svg
              id="i-edit"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z"></path>
            </svg>
          </button>
        </form>
        <div className="w-full flex gap-5 justify-between items-center">
          <button
            onClick={() => {
              setIsSecretClicked(!isSecretClicked);
              if (key === "") {
                sendUserSecretKey();
              }
            }}
            className="w-1/2 bg-pink-500 cursor-pointer rounded-full mt-4 text-2xl py-2"
          >
            Create new login secret key
          </button>
          <button
            onClick={() => {
              setIsSecretClicked(!isSecretClicked);
              if (key === "") {
                alert("you dont have login key yet. please create first");
              }
            }}
            className="w-1/2 bg-purple-500 cursor-pointer rounded-full mt-4 text-2xl py-2"
          >
            see login secret key
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-[10vw] border-2 fixed left-4 cursor-pointer top-4 border-red-500 rounded-md text-red-500"
        >
          Back to home page
        </button>
        {isSecretClicked && (
          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              y: 0,
              scaleX: 1,
            }}
            transition={{ duration: 0.6 }}
            className="w-1/2 py-4 px-4  bg-[#000] rounded-md fixed top-[50%] left-[25%] "
          >
            <h1 className="text-3xl text-white text-center">
              please keep it safe
            </h1>
            <input
              className="w-full text-2xl px-4 py-2 mt-4 bg-pink-500 rounded-full outline-none"
              disabled
              type="text"
              value={key ? key : "secret key is not generated yet"}
            />
            <div
              onClick={() => {
                navigator.clipboard
                  .writeText(key)
                  .then(() => {
                    alert("Secret key copied to clipboard!");
                  })
                  .catch((err) => {
                    console.error("Failed to copy secret key: ", err);
                  });
              }}
              className="w-full flex justify-center items-center "
            >
              <button className=" w-1/2 px-2 py-2 text-2xl cursor-pointer bg-[#ffffff33] text-pink-500 rounded-md mt-3 ">
                Copy
              </button>
            </div>{" "}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default ProfilePage;
