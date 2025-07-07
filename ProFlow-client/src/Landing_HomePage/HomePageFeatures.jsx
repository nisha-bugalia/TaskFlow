// HomePageFeatures.jsx
import React from "react";
import { FiEdit, FiUsers, FiCalendar, FiBell, FiShield, FiGlobe } from "react-icons/fi";

const features = [
  {
    title: "Task Management",
    description: "Create, assign, and track tasks with ease. Set deadlines, add descriptions, and monitor progress.",
    icon: <FiEdit className="text-white text-xl" />,
    bg: "bg-purple-600",
  },
  {
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time updates, comments, and file sharing capabilities.",
    icon: <FiUsers className="text-white text-xl" />,
    bg: "bg-blue-600",
  },
  {
    title: "Project Timeline",
    description: "Visualize project timelines with Gantt charts and calendar views to stay on track.",
    icon: <FiCalendar className="text-white text-xl" />,
    bg: "bg-green-600",
  },
  {
    title: "Real-time Updates",
    description: "Get instant notifications about project changes, comments, and deadline reminders.",
    icon: <FiBell className="text-white text-xl" />,
    bg: "bg-red-600",
  },
  {
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and compliance with industry standards.",
    icon: <FiShield className="text-white text-xl" />,
    bg: "bg-purple-700",
  },
  {
    title: "Global Access",
    description: "Access your projects from anywhere with cloud synchronization and mobile apps.",
    icon: <FiGlobe className="text-white text-xl" />,
    bg: "bg-indigo-600",
  },
];

const HomePageFeatures = () => {
  return (
    <section id="features" className="bg-white dark:bg-zinc-900 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Everything you need to <span className="text-purple-600">stay organized</span>
        </h2>
        <p className="text-gray-600 text-base dark:text-gray-300 mb-12">
          Powerful features designed to help teams collaborate effectively and deliver projects on time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border-none dark:bg-zinc-800 text-start p-6 rounded-xl shadow-md hover:shadow-lg transition border dark:border-zinc-700"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg mb-4 ${feature.bg}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageFeatures;
