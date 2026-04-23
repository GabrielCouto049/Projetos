import { useState } from "react";
import { useTaskContext } from "../../context/taskContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";
import Style from "./TaskItem.module.css";

function TaskItem({ task }) {
  const { removeTask, toggleTask, editTask } = useTaskContext();
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropDown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={Style.taskItem}>
      <div className={Style.taskHeader}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          readOnly
        />
        <h3
          className={`${Style.taskTitle} ${task.completed ? Style.completed : ""}`}
          onClick={toggleDropDown}
        >
          {task.title}
        </h3>
        <p
          className={`${Style.taskPriority} ${task.priority >= 7 ? Style.high : task.priority >= 4 ? Style.medium : Style.low}`}
        >
          Priority: {task.priority}
        </p>

        <div className={Style.taskActions}>
          <button onClick={() => editTask(task.id)}>
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button
            className={Style.deleteButton}
            onClick={() => removeTask(task.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
      <div className={`${Style.taskDetails} ${isOpen ? Style.open : ""}`}>
        <p className={Style.taskDescription}>{task.description}</p>
      </div>
    </div>
  );
}

export default TaskItem;
