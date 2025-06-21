import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion"
import React from "react";
import Step1Role from "./Onboarding/Step1Role";
import Step2Company from "./Onboarding/Step2Company";
import Step3Skills from "./Onboarding/Step3Skills";
import Loading from "./Loading";
import UploadImage from "./UploadImage";

function OnboardingFlow() {
  const [showLoading, setShowLoading] = useState(false);
  const [success,setSuccess]=useState(true);
  const [show, setShow] = useState(false);
  const [searchParams] = useSearchParams();

  const token = searchParams.get("code");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    skills: [],
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const updateData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const steps = {
    1: <Step1Role next={next} updateData={updateData} />,
    2: <Step2Company next={next} back={back} updateData={updateData} />,
    3: <Step3Skills next={next} back={back} updateData={updateData} />,
    4: <UploadImage></UploadImage>
  };

  useEffect(() => {
    setShowLoading(true);
    fetch("http://localhost:5000/user/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "verified") {
          setShowLoading(false);
          setShow(true);
        }
      });
      setTimeout(()=>{
        setSuccess(false);
      },1200)
  }, []);
  return (
    show && (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 px-4">
        {showLoading && <Loading></Loading>}
        <AnimatePresence>
        {success &&     <motion.div className="fixed top-0 left-0 m-2 text-green-900 border-b-2 border-b-green-500 text-sm bg-green-100 p-2 pb-1"
         initial={{ left:-500,opacity:0}} animate ={{left:0,opacity:1}} exit={{opacity:0}} transition={{ duration:1}} >
        
          Verified Successfully
        </motion.div>}
        </AnimatePresence>

        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-purple-100 p-6 sm:p-8 transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600 font-medium">
              Step {step} of 4
            </div>
            <div className="w-24 h-2 bg-purple-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {steps[step]}
        </div>
      </div>
    )
  );
}

export default OnboardingFlow;
