import { useReducer } from "react";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      console.log("Reducer: Adding task:", action.payload.newTask);
      return { ...state, tasks: [...state.tasks, action.payload.newTask] };

    case "REMOVE_TASK":
      return { 
        ...state, 
        tasks: state.tasks.filter((task) => task.id !== action.payload.id) 
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, completed: !task.completed } : task
        ),
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            const { toChange, text } = action.payload;
            return { ...task, [toChange]: text }; // Modifica a propriedade válida
          }

          return task;
        }),
      };

    case "REORDER_TASKS":
      switch (action.payload.criteria) {
        case "alpha":
          return { 
            ...state, 
            tasks: [...state.tasks].sort((a, b) => a.title.localeCompare(b.title)) 
          };

        case "date":
          return { 
            ...state,
            tasks: [...state.tasks].sort((a, b) => b.createdAt - a.createdAt) 
          };

        case "status":
          return {
            ...state,
            tasks: [...state.tasks].sort((a, b) => {
              // Tarefas completas vão para o final
              if (a.completed === b.completed) return 0;
              return a.completed ? 1 : -1;
            }),
          };

        case "priority":
          return { 
            ...state, 
            tasks: [...state.tasks].sort((a, b) => b.priority - a.priority) 
          };

        default:
          return state;
      }

    default:
      return state;
  }
};

// Hook customizado para usar o reducer
function useTaskReducer() {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] }); // Inicia sem tarefas

  return { state, dispatch };
}

export default useTaskReducer;