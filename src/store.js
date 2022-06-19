import create from "zustand";
import { v4 as uuidv4 } from "uuid";

const setAddTodo = (set) => (todo) =>
  set((state) => ({ todos: [...state.todos, todo] }));

const setEditTodo = (set) => (id, todo) =>
  set((state) => {
    const todos = state.todos.map((_t) => {
      if (_t.id === id) {
        console.log("Editing todo", todo);
        return { ...todo, v: todo?.v ?? 0 + 1 };
      }
      return _t;
    });
    return { todos };
  });

const setCreateNewTodo = (set) => () => {
  const newKey = uuidv4();
  set((state) => ({
    todos: [
      ...state.todos.map((t) => ({ ...t, isSelected: false })),
      {
        id: newKey,
        name: `Default Title - ${state.todos.length + 1}`,
        items: [],
        isSelected: true,
      },
    ],
  }));
};

const setSelectCurrentTodo = (set) => (todoId) => {
  set(({ todos }) => ({
    todos: todos.map((t) => {
      if (t.id === todoId) {
        const newTodo = { ...t, isSelected: true };
        return newTodo;
      }
      return { ...t, isSelected: false };
    }),
  }));
};

const setAddNewTodoItem = (set) => (tId, value) => {
  set((state) => {
    const todos = state.todos.map((t) => {
      if (t.id === tId) {
        return {
          ...t,
          items: [
            ...t.items,
            {
              id: uuidv4(),
              value,
              completed: false,
            },
          ],
        };
      }
      return t;
    });
    return {
      todos,
    };
  });
};

const setCompleteTask = (set) => (tId, ItemId, value) => {
  set((state) => {
    return {
      todos: state.todos.map((_t) => {
        if (tId === _t.id) {
          return {
            ..._t,
            items: _t.items.map((_i) => {
              if (_i.id === ItemId) {
                return { ..._i, completed: value };
              }
              return _i;
            }),
          };
        }
        return _t;
      }),
    };
  });
};

const setDeleteTodo = (set) => (tId) => {
  set((state) => {
    return {
      todos: state.todos.filter((_t) => _t.id !== tId),
    };
  });
};

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));

export const useStore = create((set) => ({
  todos: getLocalStorage("todos") ?? [],
  addTodo: setAddTodo(set),
  editTodo: setEditTodo(set),
  deleteTodo: setDeleteTodo(set),
  createNewTodo: setCreateNewTodo(set),
  selectCurrentTodo: setSelectCurrentTodo(set),
  addNewTodoItem: setAddNewTodoItem(set),
  completeTask: setCompleteTask(set),
}));
