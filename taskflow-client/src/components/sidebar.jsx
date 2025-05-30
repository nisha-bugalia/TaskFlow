import React from 'react'
import { Link } from 'react-router-dom';
function sidebar() {
  return (
    <div className="fixed top-16 rounded-2xl w-64 h-[calc(100vh-4rem)] bg-purple-200 text-white">
  <div class="p-4">
    <h1 class="text-xl font-bold text-gray-900">My WorkSpace</h1>
  </div>
  <nav class="flex-1 px-2 space-y-1">
    <Link to="/dashboard" class="flex items-center p-2 text-base font-medium text-gray-800 hover:bg-purple-100 rounded">
      📦 Dashboard
    </Link>
    <Link to="/profile" class="flex items-center p-2 text-base font-medium text-gray-800 hover:bg-purple-100 rounded">
      👤 Profile
    </Link>
    <Link to="/settings" class="flex items-center p-2 text-base font-medium text-gray-800 hover:bg-purple-100 rounded">
      ⚙️ Settings
    </Link>
    <Link to="/logout" class="flex items-center p-2 text-base font-medium text-gray-800 hover:bg-purple-100 rounded">
      🚪 Logout
    </Link>
  </nav>

    </div>
  )
}

export default sidebar
