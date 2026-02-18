import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CompletedTasks = () => {
  const { user } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch completed tasks
  const fetchTasks = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/tasks?email=${user.email}`
      );
      const data = await res.json();
      const completedTasks = data.filter((task) => task.status === "completed");
      setTasks(completedTasks);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  // Delete task
  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cf3520",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      MySwal.fire("Deleted!", "Your task has been deleted.", "success");
      fetchTasks();
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0)
    return <p className="text-gray-500">No completed tasks yet.</p>;

  return (
    <div className="w-11/12 mx-auto py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold text-lg text-green-600">{task.title}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="mt-2 font-semibold text-green-600">
              {task.status.toUpperCase()}
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CompletedTasks;
