import { useState } from "react";
import useTaskReducer from "../reducers/taskReducer.jsx";

const VALID_CHANGES = new Set(["title", "description", "priority"]);
const VALID_CRITERIA = new Set(["alpha", "date", "status", "priority"]);
const VALID_PRIORITY_RANGE = { min: 1, max: 10 };

export default function useTask() {
  const { state, dispatch: taskDispatch } = useTaskReducer();
  const [task, setTask] = useState({ title: "", description: "", priority: 0 });
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    priority: false,
  });

  function addTask() {
    const { title, description, priority } = task;

    const newErrors = {
      title: false,
      description: false,
      priority: false,
    };

    let hasError = false;

    if (title.length === 0 || title.length > 30) {
      newErrors.title = true;
      hasError = true;
    }

    if (description.length === 0 || description.length > 100) {
      newErrors.description = true;
      hasError = true;
    }

    if (
      !Number.isInteger(priority) ||
      priority < VALID_PRIORITY_RANGE.min ||
      priority > VALID_PRIORITY_RANGE.max
    ) {
      newErrors.priority = true;
      hasError = true;
    }

    setErrors(newErrors);

    // limpa os erros depois de 3 segundos
    if (hasError) {
      setTimeout(() => {
        setErrors({ title: false, description: false, priority: false });
      }, 3000);
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      priority,
    };

    taskDispatch({ type: "ADD_TASK", payload: { newTask } });
    showLog();
    reset();
  }

  function showLog() {
    console.log("Current tasks:", state.tasks);
  }

  function removeTask(id) {
    taskDispatch({ type: "REMOVE_TASK", payload: { id } });
  }

  function toggleTask(id) {
    taskDispatch({ type: "TOGGLE_TASK", payload: { id } });
  }

  function editTask(id, toChange, text) {
    if (!VALID_CHANGES.has(toChange)) {
      console.error(`Invalid field to change: ${toChange}`);
      return;
    }

    if (toChange === "title" && (text.trim() === "" || text.length > 30)) {
      console.error("Invalid title");
      return;
    }

    if (
      toChange === "description" &&
      (text.trim() === "" || text.length > 100)
    ) {
      console.error("Invalid description");
      return;
    }

    if (toChange === "priority") {
      const priorityValue = parseInt(text, 10);
      if (
        isNaN(priorityValue) ||
        priorityValue < VALID_PRIORITY_RANGE.min ||
        priorityValue > VALID_PRIORITY_RANGE.max
      ) {
        console.error(
          `Invalid priority. Must be a number between ${VALID_PRIORITY_RANGE.min} and ${VALID_PRIORITY_RANGE.max}`,
        );
        return;
      }
      text = priorityValue; // Converte para número antes de enviar para o reducer
    }

    taskDispatch({ type: "EDIT_TASK", payload: { id, toChange, text } });
  }

  function reorderTasks(criteria) {
    if (!VALID_CRITERIA.has(criteria)) {
      console.error(`Invalid reorder criteria: ${criteria}`);
      return;
    }

    taskDispatch({ type: "REORDER_TASKS", payload: { criteria } });
  }

  // Funções para alterar os campos da tarefa
  function handleTitleChange(value) {
    setTask((prevTask) => ({ ...prevTask, title: value }));
  }
  function handleDescriptionChange(value) {
    setTask((prevTask) => ({ ...prevTask, description: value }));
  }
  function handlePriorityChange(value) {
    setTask((prevTask) => ({ ...prevTask, priority: value }));
  }
  function reset() {
    setTask({ title: "", description: "", priority: 0 });
  }

  return {
    state,
    addTask,
    removeTask,
    toggleTask,
    editTask,
    reorderTasks,
    handleTitleChange,
    handleDescriptionChange,
    handlePriorityChange,
    errors,
  };
}
