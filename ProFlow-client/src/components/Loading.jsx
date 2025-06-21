import React from 'react'
import {motion} from "framer-motion"
const Loading = () => {
  return (
    <div className=" fixed z-50 backdrop-blur-lg w-[100vw] h-[100vh] top-0 left-0 flex flex-col justify-center items-center">
        <motion.div
          initial={{ left: 0, position: "relative" }}
          animate={{ left: [-100, 0, 100], position: "relative" }}
          transition={{
            repeat: Infinity,
          }}
          className=" bg-purple-800 w-4 h-4 rounded-lg"
        ></motion.div>
      </div>
  )
}

export default Loading
