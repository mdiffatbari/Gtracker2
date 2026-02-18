import React, { useState } from 'react';
import TaskForm from '../../components/tasks/TaskForm';
import TaskList from '../../components/tasks/TaskList';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('addTask');

  // After adding a task, switch to My Tasks tab
  const handleTaskAdded = () => {
    setActiveView('myTasks');
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-6">
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-6">

        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-1/4 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-[#cf3520]">Dashboard</h2>

          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActiveView('addTask')}
                className={`w-full text-left px-4 py-2 rounded-lg transition
                  ${activeView === 'addTask'
                    ? 'bg-[#cf3520] text-white'
                    : 'hover:bg-[#cf3520]/10'
                  }`}
              >
                ➕ Add Task
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveView('myTasks')}
                className={`w-full text-left px-4 py-2 rounded-lg transition
                  ${activeView === 'myTasks'
                    ? 'bg-[#cf3520] text-white'
                    : 'hover:bg-[#cf3520]/10'
                  }`}
              >
                📋 My Tasks
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveView('completed')}
                className={`w-full text-left px-4 py-2 rounded-lg transition
                  ${activeView === 'completed'
                    ? 'bg-[#cf3520] text-white'
                    : 'hover:bg-[#cf3520]/10'
                  }`}
              >
                ✅ Completed
              </button>
            </li>
          </ul>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
          
          {activeView === 'addTask' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
              <TaskForm onTaskAdded={handleTaskAdded} />
            </div>
          )}

          {activeView === 'myTasks' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
              <TaskList filter="pending" />
            </div>
          )}

          {activeView === 'completed' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
              <TaskList filter="completed" />
            </div>
          )}
          
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
