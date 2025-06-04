import React from 'react';

function ContactPage({ darkMode }) {
  return (
    <div className={`border-2 rounded-lg m-2 min-h-screen p-20 px-6 ${darkMode ? 'bg-gray-900 text-white border-purple-600' : 'bg-purple-100 text-gray-800 border-purple-950'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Contact Us</h2>
        <p className="text-lg mb-8 text-center">We're here to help and answer any questions you might have.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Subject</label>
              <input
                type="text"
                required
                placeholder="Task not working..."
                className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                required
                rows="5"
                placeholder="Write your message here..."
                className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details */}
          <div className="space-y-6 text-lg">
            <div>
              <h3 className="text-xl font-semibold mb-1">Email</h3>
              <p>support@taskflow.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Phone</h3>
              <p>+91 96938 02479</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Address</h3>
              <p>
                TaskFlow HQ<br />
                22 Tech Street,<br />
                Bangalore, India
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Social Media</h3>
              <p className="space-x-4">
                <a href="#" className="text-purple-500 hover:underline">Instagram</a>
                <a href="#" className="text-purple-500 hover:underline">Twitter</a>
                <a href="#" className="text-purple-500 hover:underline">LinkedIn</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
