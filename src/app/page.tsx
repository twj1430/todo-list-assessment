"use client";
import { useState, useEffect } from "react";
import "./globals.css";

// List of available activity types
const activityTypes: string[] = [
  "Education",
  "Recreational",
  "Social",
  "Diy",
  "Charity",
  "Cooking",
  "Relaxation",
  "Music",
  "Busywork",
];

export default function TodoList() {
  // State to manage tasks
  const [tasks, setTasks] = useState<
    {
      activity: string;
      price: number;
      type: string;
      bookingRequired: boolean;
      accessibility: number;
    }[]
  >([]);

  // State for form inputs
  const [activity, setActivity] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState<string>(activityTypes[0]);
  const [bookingRequired, setBookingRequired] = useState<boolean>(false);
  const [accessibility, setAccessibility] = useState<number>(0.0);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle form submission and add a new task
  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activity.trim() || price <= 0) return;

    const newTask = { activity, price, type, bookingRequired, accessibility };
    setTasks([...tasks, newTask]);
    
    // Reset form fields after submission
    setActivity("");
    setPrice(0);
    setType("education");
    setBookingRequired(false);
    setAccessibility(0.0);
  };

  // Function to remove a task by index
  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <p className="summary">Total Activities: {tasks.length}</p>
      <form onSubmit={addTask} className="form">
        <div className="form-group">
          <label htmlFor="activity">Activity:</label>
          <input
            type="text"
            placeholder="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
          >
            {activityTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Checkbox for Booking Required */}
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={bookingRequired}
            onChange={() => setBookingRequired(!bookingRequired)}
          />
          Booking Required
        </label>
        
        {/* Slider for Accessibility */}
        <label className="slider-label">
          Accessibility: {accessibility}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={accessibility}
            onChange={(e) => setAccessibility(Number(e.target.value))}
            className="slider"
          />
        </label>
        
        {/* Submit Button */}
        <button type="submit" className="btn">
          Add Activity
        </button>
      </form>

      {/* Display List of Activities */}
      <ul className="list">
        {tasks.map((task, index) => (
          <li key={index} className="list-item">
            <span>
              {task.activity} - RM{task.price} ({task.type})
            </span>
            <button onClick={() => removeTask(index)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
