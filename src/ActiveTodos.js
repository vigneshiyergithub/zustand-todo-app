import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import crossIcon from "./assets/cancel.png";
import { useStore } from "./store";
import { DELETE_TODO_CONTENT } from "./App";

export const ActiveTodos = () => {
  const todos = useStore(
    (state) => state.todos,
    (oldV, newV) => JSON.stringify(oldV) === JSON.stringify(newV)
  );
  const { addToast } = useToasts();
  const deleteTodo = useStore((state) => state.deleteTodo);
  const setCurrentTodo = useStore((state) => state.selectCurrentTodo);
  const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));
  useEffect(() => {
    return () => {
      console.log("Writing todos... local storage");
      setLocalStorage("todos", todos);
    };
  });
  const onDelete = (tId) => {
    deleteTodo(tId);
    addToast(DELETE_TODO_CONTENT, { appearance: "warning", autoDismiss: true });
  };
  const perCent = (t) => {
    const completedTodos = t.items.filter((i) => i.completed).length;
    const totalTodos = t.items.length;
    return totalTodos > 0
      ? `${parseInt((completedTodos / totalTodos) * 100)}`
      : 0;
  };
  const getStyle = (t) => {
    const per = perCent(t);
    console.log("per", per);
    if (per > 0) {
      return {
        background: `linear-gradient(
          to right, 
          darkcyan 0%, 
          darkcyan ${per}%, 
          darkcyan ${per}%, 
          lightcyan 100%
        )`,
      };
    }
    return {};
  };
  return (
    <>
      {todos.map((_t) => (
        <div
          key={_t.id}
          className={`content-sidebar-item todo-sidebar-item ${_t.isSelected && "content-sidebar-item-selected"}`}
          onClick={() => setCurrentTodo(_t.id)}
          style={getStyle(_t)}
        >
          <div>{_t.name}</div>
          <div>
            <img
              src={crossIcon}
              className="todo-item-delete"
              alt="todo-delete-item-icon"
              onClick={() => onDelete(_t.id)} />
          </div>
        </div>
      ))}
    </>
  );
};
