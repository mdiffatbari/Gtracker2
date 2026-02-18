import React, { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const TaskForm = ({ onTaskAdded }) => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      userEmail: user.email,
    };

    setLoading(true);

    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    const data = await res.json();

    setLoading(false);
    setTitle('');
    setDescription('');

    if (onTaskAdded) {
      onTaskAdded(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        type="text"
        placeholder="Task title"
        className="input input-bordered w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Task description (optional)"
        className="textarea textarea-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="btn bg-[#cf3520] hover:bg-[#b92f1d] text-white border-none"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
