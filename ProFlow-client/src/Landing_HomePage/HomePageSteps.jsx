import React from "react";

const steps = [
  {
    number: "1",
    title: "Sign Up",
    description: "Create your free account in seconds. No credit card required.",
    color: "bg-gradient-to-br from-purple-500 to-purple-700",
  },
  {
    number: "2",
    title: "Create Projects",
    description: "Set up your first project and invite team members to collaborate.",
    color: "bg-blue-600",
  },
  {
    number: "3",
    title: "Track Progress",
    description: "Monitor tasks, deadlines, and team performance with powerful analytics.",
    color: "bg-green-600",
  },
];

const HomePageSteps = () => {
  return (
    <section
      id="how"
      className="bg-white dark:bg-zinc-900 py-12 px-2 text-center"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get started in{" "}
          <span className="text-purple-600">3 simple steps</span>
        </h2>
        <h3 className="text-gray-600 text-base dark:text-gray-300 mb-12">
          Setting up ProFlow is quick and easy. Start managing your projects in minutes.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div
                className={`w-14 h-14 rounded-full text-white text-lg font-semibold flex items-center justify-center shadow-lg mb-4 ${step.color}`}
              >
                {step.number}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-2xl mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageSteps;
