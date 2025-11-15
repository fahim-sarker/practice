"use client";
import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id: number) => {
    if (!editingText.trim()) return;
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a todo..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTodo()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul>
          {todos.length === 0 && (
            <li className="text-gray-400 text-center">No todos yet!</li>
          )}
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex justify-between items-center mb-2 p-2 border rounded hover:bg-gray-50 transition"
            >
              {/* Todo Text or Edit Input */}
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && saveEdit(todo.id)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoFocus
                />
              ) : (
                <span
                  className={`flex-1 cursor-pointer ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </span>
              )}

              <div className="flex gap-2 ml-2">
                {/* Edit Button */}
                {editingId === todo.id ? (
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => saveEdit(todo.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                    onClick={() => startEdit(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                )}

                {/* Delete Button */}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;
