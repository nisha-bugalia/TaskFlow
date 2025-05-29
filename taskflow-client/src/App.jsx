function App() {
  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
    <h1 class="text-3xl font-bold text-blue-700 mb-4 text-center">Welcome to TaskFlow!</h1>
    <p class="text-gray-700 mb-6 text-center">Manage your tasks efficiently with a modern design.</p>

    <form class="space-y-4">
      <input
        type="text"
        placeholder="Enter your task..."
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition duration-300"
      >
        Add Task
      </button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-500">
      <a href="#" class="hover:underline">Learn More</a>
    </div>
  </div>
</div>


  );
}

export default App;