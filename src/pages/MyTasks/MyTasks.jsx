import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [search, setSearch] = useState('');

  // Fetch pending tasks
  const fetchTasks = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/tasks?email=${user.email}`);
      const data = await res.json();
      const pendingTasks = data.filter(task => task.status === 'pending');
      setTasks(pendingTasks);
      setFilteredTasks(pendingTasks);
    } catch (error) {
      console.error(error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch tasks',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  // Filter tasks by search
  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [search, tasks]);

  // Delete task
  const handleDelete = async (id) => {
    const confirm = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This task will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#cf3520',
      cancelButtonColor: '#888',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Task deleted successfully',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      fetchTasks();
    }
  };

  // Complete task
  const handleComplete = async (id) => {
    await fetch(`http://localhost:3000/tasks/status/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' }),
    });

    MySwal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Task marked as completed',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    fetchTasks();
  };

  // Start editing
  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    await fetch(`http://localhost:3000/tasks/${editingTask}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, description: editDescription }),
    });

    setEditingTask(null);
    MySwal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Task updated successfully',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    fetchTasks();
  };

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p className="text-gray-500">No pending tasks.</p>;

  return (
    <div className='w-11/12 mx-auto py-10'>
      {/* Search bar */}
      <div className="mb-11 text-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full border-[#cf3520] py-6"
        />
      </div>

      {/* Tasks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
          <div key={task._id} className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition relative">
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
              <>
                <h3 className="font-bold text-lg mb-1">{task.title}</h3>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="btn btn-sm btn-outline border-[#cf3520] text-[#cf3520]"
                    onClick={() => startEdit(task)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleComplete(task._id)}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
