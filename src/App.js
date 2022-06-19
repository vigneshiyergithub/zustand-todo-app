import { useToasts } from "react-toast-notifications";
import { ActiveTodos } from "./ActiveTodos";
import "./App.css";
import { CurrentTodoSection } from "./CurrentTodoSection";
import { useStore } from "./store";

const ADD_TODO_CONTENT = "Added new todo!";
export const DELETE_TODO_CONTENT = "Deleted todo!";

function App() {
  const createNew = useStore((state) => state.createNewTodo);
  const { addToast } = useToasts();
  const addNewTodo = () => {
    createNew();
    addToast(ADD_TODO_CONTENT, { appearance: "success", autoDismiss: true });
  };
  return (
    <div className="App">
      <header>Todo App with Zustand</header>
      <div className="content-container">
        <div className="content-sidebar">
          <div className="content-sidebar-item">
            <button className="btn-add-todo" onClick={addNewTodo}>
              Add New Todo
            </button>
          </div>
          <div className="content-sidebar-item content-sidebar-title">
            Active Todos
          </div>
          <ActiveTodos />
        </div>
        <div className="content-main">
          <CurrentTodoSection />
        </div>
      </div>
    </div>
  );
}

export default App;
