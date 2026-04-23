import style from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem.jsx";
import { useTaskContext } from "../../context/taskContext.jsx";

function TaskList() {
    const { state } = useTaskContext();
    console.log("Rendering TaskList with tasks:", state.tasks);

    return (
        <div className={style.taskList}>
            {state.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;