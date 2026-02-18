import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const TaskList = ({ filter }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch tasks
  const fetchTasks = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/tasks?email=${user.email}`);
      const data = await res.json();
      const filtered = filter ? data.filter(task => task.status === filter) : data;
      setTasks(filtered);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to fetch tasks', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [user, filter]);

  // Delete task
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This task will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#cf3520',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
        Swal.fire('Deleted!', 'Task has been deleted.', 'success');
        fetchTasks();
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to delete task', 'error');
      }
    }
  };

  // Complete task
  const handleComplete = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });
      Swal.fire('Completed!', 'Task has been marked as completed.', 'success');
      fetchTasks();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to complete task', 'error');
    }
  };

  // Start editing task
  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    try {
      await fetch(`http://localhost:3000/tasks/${editingTask}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });

      setEditingTask(null);
      Swal.fire('Updated!', 'Task has been updated.', 'success');
      fetchTasks();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update task', 'error');
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p className="text-gray-500">No tasks found.</p>;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 bg-[#fdf0ef] rounded-lg shadow">
          {editingTask === task._id ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                className="input input-bordered w-full"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="textarea textarea-bordered w-full"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              ></textarea>
              <div className="flex gap-2">
                <button type="submit" className="btn bg-[#cf3520] hover:bg-[#b92f1d] text-white border-none">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline border-[#cf3520] text-[#cf3520]"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p
                  className={`mt-1 font-semibold ${
                    task.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                  }`}
                >
                  {task.status.toUpperCase()}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  className="btn btn-sm btn-outline border-[#cf3520] text-[#cf3520]"
                  onClick={() => startEdit(task)}
                >
                  Update
                </button>
                {task.status !== 'completed' && filter !== 'completed' && (
                  <button
                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleComplete(task._id)}
                  >
                    Complete
                  </button>
                )}
                <button
                  className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
