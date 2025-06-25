import React, { useState, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { BiPlus } from "react-icons/bi";
import { ImImage } from "react-icons/im";
import { useRef } from "react";
import axios from "axios";

const AddTasksModal = ({
  onClose,
  onSave,
  isEdit = false,
  initialData = {},
}) => {
  const [currentMember, setCurrentMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState(initialData.title || "");
  const [tag, setTag] = useState(initialData.tag || "");
  const [description, setDescription] = useState(initialData.description || "");
<<<<<<< HEAD
  const [userNotFound, setUserNotFound] = useState(false);
=======
const [userNotFound,setUserNotFound]=useState(false);
>>>>>>> 18ae2214d17deac42d8d87f43a3d428d8f8d18ea
  const priorityMap = {
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Critical",
  };

  const reversePriorityMap = {
    Low: 1,
    Medium: 2,
    High: 3,
    Critical: 4,
  };

  const [priorityValue, setPriorityValue] = useState(
    initialData.priority ? reversePriorityMap[initialData.priority] : 2
  );
  const [deadline, setDeadline] = useState(
    initialData.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );
  const removeMember = (member) => {
    try {
      const newMem = members.filter((mem) => mem !== member);
      setMembers(newMem);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/project/create-project",
        { title, description },
        {
          withCredentials: true,
        }
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }

    const updatedProject = {
      ...initialData,
      title,
      description,
      tag,
      startDate: new Date().toISOString(),
      dueDate: new Date(deadline).toISOString(),
      priority: priorityMap[priorityValue],
      progress: 0,
      completedTasks: 0,
      totalTasks: 0,
    };
    onSave(updatedProject);
    onClose();
  };

  const addUser = () => {
    console.log(currentMember);
    axios
      .post("http://localhost:5000/project/check-user", {
        email: currentMember,
      })
      .then((res) => {
        alert(res.data.message);
        setMembers([...members, currentMember]);
        setCurrentMember(null);
<<<<<<< HEAD
      })
      .catch((error) => {
        if (error.status === 404) {
          setUserNotFound(true);
        }
        setTimeout(() => {
          setUserNotFound(false);
        }, 250);
        console.log(error?.response?.data?.message || error.message);
      });
=======
        
      })
      .catch((error) => {
        if(error.status===404){
          setUserNotFound(true);
        }
        setTimeout(()=>{
          setUserNotFound(false)
        },250)
       console.log(error?.response?.data?.message||error.message);});
>>>>>>> 18ae2214d17deac42d8d87f43a3d428d8f8d18ea
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [images, setImages] = useState([]);
  const [imageAdd, setImageAdd] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const DragDrop = () => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
      const files = Array.from(e.target.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    };
    return (
      <div
        className="fixed top-0 flex justify-center items-center w-[100vw] h-[100vh] z-20 backdrop-blur-md bg-white/60 text-black"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <div className="h-auto w-[95%] sm:w-[70%] rounded-md p-2 flex flex-col gap-5 shadow-md bg-white">
          <div className="flex justify-between">
            <div className="h-1/5">
              Drag and Drop Here or Click + To Add Image
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setImageAdd(false);
                setImages([]);
              }}
            >
              <GiCancel />
            </div>
          </div>
          <div className="h-3/5 border-dotted p-2 rounded-lg border-4 flex justify-center items-center border-gray-300">
            <div
              className="text-7xl text-gray-500 cursor-pointer"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              <BiPlus />
            </div>
          </div>
          <div className="h-1/5 p-2 flex flex-wrap gap-2 w-full overflow-y-auto">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="overflow-hidden w-1/12 border border-gray-300 h-full p-1 rounded-md flex items-center"
              >
                <img src={image} className="rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[1000]">
      {imageAdd && <DragDrop />}
      <div className="bg-white p-6 rounded-lg w-[850px] max-w-full flex gap-6 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black"
        >
          <GiCancel />
        </button>

        {/* Task Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            {isEdit ? "Edit Project" : "Create Project"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Task title"
              className="border border-gray-300 rounded p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="Task tag"
              className="border border-gray-300 rounded p-2"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            /> */}
            {/* <textarea
              placeholder="Task description"
              className="border border-gray-300 rounded p-2 h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea> */}
            <div className="flex gap-4">
              {/* <input
                type="date"
                className="border border-gray-300 rounded p-2 flex-1"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
<<<<<<< HEAD
              /> */}
              {/* <div className=" flex items-center justify-center">
=======
              />
              <div className=" flex items-center justify-center">
>>>>>>> 18ae2214d17deac42d8d87f43a3d428d8f8d18ea
                <input
                  type="text"
                  placeholder="Assign to"
                  value={currentMember || ""}
                  onChange={(e) => setCurrentMember(e.target.value)}
                  className="border rounded p-2 flex-1 "
<<<<<<< HEAD
                  style={{
                    borderStyle: "solid", // required

                    borderColor: userNotFound ? "red" : "gray",
                    backgroundColor: userNotFound
                      ? "rgba(255,0,0,0.1)"
                      : "white",
                    color: userNotFound ? "rgba(255,0,0)" : "black",
                    transition: "all 0.3s ease",
=======
                  style={ {   borderStyle: "solid",  // required
  
  borderColor: userNotFound ? "red" : "gray",
  backgroundColor:userNotFound ? "rgba(255,0,0,0.1)" : "white",
  color:userNotFound ? "rgba(255,0,0)" : "black",
  transition: "all 0.3s ease",
>>>>>>> 18ae2214d17deac42d8d87f43a3d428d8f8d18ea
                  }}
                />
                <div className=" p-2 cursor-pointer" onClick={addUser}>
                  <BiPlus></BiPlus>
                </div>
<<<<<<< HEAD
              </div> */}
              {/* {members.map((member) => (
                <div
                  onClick={() => {
                    removeMember(member);
                  }}
                  className=" cursor-pointer"
                >
                  {" "}
                  {member}
                </div>
              ))} */}
=======
              </div>
              {members.map((member) => (
                <div onClick={()=>{removeMember(member)}} className=" cursor-pointer"> {member}</div>
              ))}
>>>>>>> 18ae2214d17deac42d8d87f43a3d428d8f8d18ea
            </div>

            <div className="mt-4">
              <label className="block font-medium text-sm mb-2">
                Priority:
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={priorityValue}
                onChange={(e) => setPriorityValue(Number(e.target.value))}
                className="w-full accent-purple-700"
              />

              <div className="flex justify-between text-xs mt-1 text-gray-600 font-medium">
                <span
                  className={
                    priorityValue === 1 ? "text-green-600 font-bold" : ""
                  }
                >
                  Low
                </span>
                <span
                  className={
                    priorityValue === 2 ? "text-yellow-600 font-bold" : ""
                  }
                >
                  Medium
                </span>
                <span
                  className={
                    priorityValue === 3 ? "text-orange-700 font-bold" : ""
                  }
                >
                  High
                </span>
                <span
                  className={
                    priorityValue === 4 ? "text-red-900 font-bold" : ""
                  }
                >
                  Critical
                </span>
              </div>
            </div>

            <div
              className="p-2 border w-fit rounded-full cursor-pointer mt-2 
                  bg-gray-100 hover:bg-gray-200 text-black"
              onClick={() => {
                setImageAdd(true);
              }}
            >
              <ImImage />
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-grey-700 text-white font-medium py-2 px-4 rounded"
            >
              {isEdit ? "Save Changes" : "Create Project"}
            </button>
          </form>
        </div>

        </div>
    </div>
  );
};

export default AddTasksModal;
