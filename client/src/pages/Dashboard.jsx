import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
          <h2 className="text-xl font-semibold mb-2">Card 1</h2>
          <p>This is a dashboard card.</p>
        </div>
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
          <h2 className="text-xl font-semibold mb-2">Card 2</h2>
          <p>This is another dashboard card.</p>
        </div>
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
          <h2 className="text-xl font-semibold mb-2">Card 3</h2>
          <p>More dashboard content here.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
