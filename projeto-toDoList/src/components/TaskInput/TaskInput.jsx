import Style from "./TaskInput.module.css";
import { useTaskContext } from "../../context/taskContext.jsx";

function TaskInput({ isVisible }) {
  const {
    addTask,
    handleTitleChange,
    handleDescriptionChange,
    handlePriorityChange,
    errors
  } = useTaskContext();

  return (
    <div className={`${Style.taskInputContainer} ${isVisible ? "": Style.hiddenCard}`}>
      <input
        type="text"
        id="task"
        placeholder="Enter a new task..."
        className={Style.titleInput}
        onChange={(e) => handleTitleChange(e.target.value)}
      />

      <p className={`${Style.errorMessage} ${errors.title ? "" : Style.hidden}`}>
        Invalid title!
      </p>

      <input
        type="number"
        id="priority"
        placeholder="Enter a priority..."
        className={Style.priorityInput}
        onChange={(e) => handlePriorityChange(Number(e.target.value))}
      />

      <p className={`${Style.errorMessage} ${errors.priority ? "" : Style.hidden}`}>
        Priority must be a number between 1 and 10!
      </p>

      <textarea
        id="description"
        placeholder="Enter a description..."
        className={Style.descriptionInput}
        onChange={(e) => handleDescriptionChange(e.target.value)}
      />

      <p className={`${Style.errorMessage} ${errors.description ? "" : Style.hidden}`}>
        Invalid description!
      </p>

      <button className={Style.addButton} onClick={() => {
        addTask()
        document.getElementById("task").value = "";
        document.getElementById("priority").value = "";
        document.getElementById("description").value = "";
        }}>
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
