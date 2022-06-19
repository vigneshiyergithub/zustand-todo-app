import { useState } from "react";
import { useStore } from "./store";
import { EditableText } from "./EditableText";

export const CurrentTodoSection = () => {
  const todos = useStore((state) => state.todos);
  const addNewTodoItem = useStore((state) => state.addNewTodoItem);
  const editTodo = useStore((state) => state.editTodo);
  const setCompleteTask = useStore((state) => state.completeTask);

  const [inputText, setInputText] = useState("");

  const currentTodo = todos.filter((t) => t.isSelected)?.[0] ?? {};
  const onEditFieldTodoTitle = (text) => {
    editTodo(currentTodo.id, { ...currentTodo, name: text });
  };
  const onEditTodoItem = (tId, itemId, value) => {
    console.log("Editing Item task", tId, itemId, value);
    editTodo(tId, {
      ...currentTodo,
      items: currentTodo.items.map((_i) => {
        if (_i.id === itemId) {
          return { ..._i, value };
        }
        return _i;
      }),
    });
  };
  return Object.keys(currentTodo).length > 0 ? (
    <div className="todo-main">
      <div className="todo-title">
        <EditableText
          value={currentTodo.name}
          onEditField={onEditFieldTodoTitle} />
      </div>
      <div className="todo-playground">
        <div className="todo-input-area">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} />
          <button
            onClick={() => {
              addNewTodoItem(currentTodo.id, inputText);
              setInputText("");
            }}
          >
            Insert
          </button>
        </div>
        <div className="todo-list">
          {currentTodo.items.map((_i) => {
            return (
              <div className="todo-list-item" key={_i.id}>
                <input
                  type="checkbox"
                  id={_i.id}
                  name={_i.id}
                  checked={_i.completed}
                  onChange={() => {
                    currentTodo.id &&
                      setCompleteTask(currentTodo.id, _i.id, !_i.completed);
                  }} />
                <label for={_i.id}>
                  <EditableText
                    value={_i.value}
                    onEditField={(text) => onEditTodoItem(currentTodo.id, _i.id, text)} />
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
};
