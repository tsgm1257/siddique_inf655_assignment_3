import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import TaskComponent from "./TaskComponent";
import TaskForm from "./TaskForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const tasksCollectionRef = collection(db, "tasks");
      const q = query(tasksCollectionRef, where("userId", "==", userId));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const userTasks = [];
          snapshot.forEach((doc) => {
            userTasks.push({ id: doc.id, ...doc.data() });
          });
          setTasks(userTasks);
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
          console.error("Error fetching tasks:", error);
        }
      );

      // Cleanup listener on unmount
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleAddTask = async (newTask) => {
    if (userId) {
      try {
        await addDoc(collection(db, "tasks"), {
          userId: userId,
          taskName: newTask.name,
          taskDescription: newTask.description,
          createdAt: serverTimestamp(),
        });
        console.log("Task added successfully!");
      } catch (err) {
        console.error("Error adding task:", err);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
    console.log("Task deleted successfully!");
  } catch (err) {
    console.error("Error deleting task:", err);
  }
};

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Your Tasks</h2>
      <TaskForm addTask={handleAddTask} />
      <TaskComponent tasks={tasks} deleteTask={handleDeleteTask} />
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#6c757d",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
