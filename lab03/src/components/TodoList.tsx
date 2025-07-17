import React, { useState } from 'react';
import './TodoList.css';

interface Todo {
  heading: string;
  lists: string[];
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState<Record<number, string>>({});

  const handleAddTodo = () => {
    const heading = headingInput.trim();
    if (heading) {
      setTodos(prev => [...prev, { heading, lists: [] }]);
      setHeadingInput('');
    }
  };

  const handleDeleteTodo = (i: number) => {
    setTodos(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleListInputChange = (i: number, v: string) => {
    setListInputs(prev => ({ ...prev, [i]: v }));
  };

  const handleAddList = (i: number) => {
    const val = listInputs[i]?.trim();
    if (!val) return;

    setTodos(prev =>
      prev.map((todo, idx) =>
        idx === i
          ? { ...todo, lists: [...todo.lists, val] }
          : todo
      )
    );

    setListInputs(prev => ({ ...prev, [i]: '' }));
  };

  return (
    <div className="todo-container">
      <h1>My To‑Do List</h1>

      <div className="input-container">
        <input
          className="heading-input"
          type="text"
          value={headingInput}
          placeholder="Add heading (e.g., Grocery List)"
          onChange={(e) => setHeadingInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Heading</button>
      </div>

      <div className="todo_main">
        {todos.map((todo, i) => (
          <div key={i} className="todo-card">
            <div className="todo-header">
              <h3>{todo.heading}</h3>
              <button
                className="delete-button-heading"
                onClick={() => handleDeleteTodo(i)}
              >
                Delete Heading
              </button>
            </div>

            <ul>
              {todo.lists.map((item, li) => (
                <li key={li}>{item}</li>
              ))}
            </ul>

            <div className="add_list">
              <input
                type="text"
                placeholder="Add list item"
                value={listInputs[i] || ''}
                onChange={(e) => handleListInputChange(i, e.target.value)}
              />
              <button onClick={() => handleAddList(i)}>Add List</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
