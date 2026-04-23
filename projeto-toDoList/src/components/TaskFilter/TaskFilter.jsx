import Style from './TaskFilter.module.css';
import { useTaskContext } from '../../context/taskContext.jsx';

function TaskFilter() {
  const { reorderTasks } = useTaskContext();

  return (
    <div className={Style.taskFilter}>
      <select name="" id="" onChange={(e) => reorderTasks(e.target.value)}>
        <option value="">Sort by...</option>
        <option value="alpha">Alphabetical</option>
        <option value="date">Creation date</option>
        <option value="status">Status</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default TaskFilter;