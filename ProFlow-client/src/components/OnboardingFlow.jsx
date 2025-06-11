import { useState } from 'react';
import React from 'react'
import Step1Role from './Onboarding/Step1Role'
import Step2Company from './Onboarding/Step2Company';
import Step3Skills from './Onboarding/Step3Skills';

function OnboardingFlow() {
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
      };    

    return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 px-4">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-purple-100 p-6 sm:p-8 transition-all duration-300 ease-in-out">
        
        <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600 font-medium">
            Step {step} of 3
            </div>
            <div className="w-24 h-2 bg-purple-100 rounded-full overflow-hidden">
            <div
                className="h-full bg-purple-500 transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
            ></div>
            </div>
        </div>

        {steps[step]}
        </div>
    </div>
    );
      
}

export default OnboardingFlow
