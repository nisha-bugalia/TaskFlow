import React, { useRef, useState } from "react";
import axios from "axios";
import {
  FaImage,
  FaPhotoVideo,
  FaPlus,
  FaPlusCircle,
  FaUpload,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import { AnimatePresence, delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [flag, setFlag] = useState(true);
  const [cropped, setCropped] = useState(null);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const handleFileClick = () => {
    fileRef.current.click();
  };
  const handleFileChange = async (e) => {
    setError(null);
    const image = e.target.files[0];
    if (!image) {
      return;
    }
    setImage(image);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      const croppedPath = res.data.path.split("\\").pop();

      setCropped(`http://localhost:5000/uploads/${croppedPath}`);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };
const navigate=useNavigate()
  return (
    <div className="flex justify-between">
      <div
        className=" w-1/2 bg-[radial-gradient(ellipse_at_100%_90%,_#7d2ffa,_#a772fc_30%,_#dbb0ff)]
 h-[100vh] p-10 flex flex-col gap-10 shadow-lg shadow-gray-400 justify-center"
      >
        <div className=" shadow-md flex flex-col w-[100%] h-[80%] justify-center items-center gap-10 backdrop-blur-md bg-white/30  border border-white rounded-lg">
          <motion.div
            className="shadow-md shadow-purple-500 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_100%_100%,_#9d58fc_40%,_#6749fc)] rounded-lg flex justify-center items-center relative"
            animate={{
              opacity: [1, 0.5, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="  absolute top-0 w-[110%] bg-purple-600  shadow-xl rounded-xl border-purple-300 border h-1 "
              animate={{
                top: [0, 260],

                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            ></motion.div>
            <FaImage className=" text-white text-[270px]  "></FaImage>
          </motion.div>
          <div className="  p-4 pt-2 pb-2 bg-white/40    rounded-full font-medium text-xl text-indigo-800 ">
            AI will scan and auto detect best Profile Size for you
          </div>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center w-1/2 gap-9 pt-5  ">
        <div className=" text-4xl font-poppins text-indigo-800 font-semibold ">
          {cropped ? "Your Profile Photo" : "Set Your Profile Photo"}
        </div>
        <div
          style={{
            width: !cropped ? "600px" : "",
            height: !cropped ? "500px" : "",
            borderWidth: !cropped ? "2px" : "",
          }}
          className="   items-center border-dotted border-purple-800  bg-purple-100  flex justify-center"
        >
          <AnimatePresence>
           
            {cropped !== null && (
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 2 }}
              >
                <img src={cropped} alt="Cropped Face" width="300" />
              </motion.div>
            )}
          </AnimatePresence>

          {cropped === null && (
            <FaPlusCircle className=" text-purple-400 text-[40px]  cursor-pointer "></FaPlusCircle>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileRef}
          onChange={handleFileChange}
        ></input>
        <AnimatePresence>
          {cropped === null && (
            <motion.div
              className=" cursor-pointer flex gap-2 items-center p-3 border text-white rounded-full shadow-lg  bg-[radial-gradient(ellipse_at_100%_100%,_#e2baff,_#5616fa)]"
              onClick={handleFileClick}
              exit={{ display: "none", opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaUserAlt className="text-xl"></FaUserAlt>
              <div> Select Profile Photo</div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {cropped !== null && (
            <motion.div
              onClick={()=>navigate("/dashboard")}
              style={{ display: "none", opacity: 0 }}
              animate={{ display: "flex", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className=" cursor-pointer flex gap-2   items-center p-3 pl-4 pr-4 border text-white rounded-full shadow-lg  bg-[radial-gradient(ellipse_at_100%_100%,_#e2baff,_#5616fa)]"
            >
              <FaUpload></FaUpload>
              <div>Upload</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
      </div>
      <div className="m-3 cursor-pointer text-gray-600 " onClick={()=>navigate("/login")}>Skip</div>
    </div>
  );
}
