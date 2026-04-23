import React, { createContext, useContext } from "react";
import useTaskReducer from "../reducers/taskReducer.jsx"; // Importa o reducer
import useTask from "../hooks/useTask.jsx"

const TaskContext = createContext();

// Provedor de Contexto que envolve os componentes filhos
export function TaskProvider({ children }) {
  const { state } = useTaskReducer(); // Obtém o estado
  const taskFunctions = useTask(); // Obtém as funções do hook personalizado

  return (
    <TaskContext.Provider value={{ state, ...taskFunctions }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom Hook para consumir o contexto
export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }

  return context;
}