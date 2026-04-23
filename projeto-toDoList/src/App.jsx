import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import TaskFilter from "./components/TaskFilter/TaskFilter.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { TaskProvider } from "./context/taskContext.jsx";
import { useState } from "react";

function App() {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const toggleInput = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <div className="App">
        <header className="pageHeader">
          <h1>My Todo List</h1>
          <button onClick={toggleInput} className={`newTaskButton ${isInputVisible ? 'active' : ''}`}>
            <FontAwesomeIcon className="plusIcon" icon={faPlus} />
          </button>
        </header>
      <TaskProvider>
        <TaskInput isVisible={isInputVisible} /> {/* input for adding new tasks && button */}
        <TaskFilter /> {/* dropdown for sorting tasks && filter options */}
        <TaskList /> {/* list of tasks with edit, delete, and toggle options */}
      </TaskProvider>
    </div>
  );
}

export default App;
