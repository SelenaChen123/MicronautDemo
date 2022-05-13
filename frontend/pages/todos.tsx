import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";

import { Todo } from "../types";
import TodoItem from "../components/todoItem";
import Link from "next/link";

interface Props {
  username: string;
}

// function fetch(a: string, b?: any): Promise<{ json: () => Todo[] }> {
//   return new Promise((resolve: any) => {
//     resolve({ json: () => [{ name: "hello", tag: "one" }, {name: "hello2", tag: "two" }] });
//   });
// }

const Todos = ({ username }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState("");
  const [isFiltered, setFiltered] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [newTodoTag, setNewTodoTag] = useState("");

  async function fetchTodos() {
    await fetch(`http://129.213.24.90:8080/api/todos`)
      .then(res => res.json())
      .then(setTodos);
  }

  useEffect(() => {
    fetchTodos();
  }, [username]);

  async function handleFilter() {
    await fetch(`http://129.213.24.90:8080/api/todos?username=${encodeURIComponent(username)}&tag=${encodeURIComponent(filterBy)}`)
      .then(res => res.json())
      .then(setTodos);
    setFiltered(true);
  }

  async function handleRemoveFilter() {
    await fetchTodos();
    setFiltered(false);
    setFilterBy("");
  }

  async function handleAddTodo() {
    console.log(JSON.stringify({ 
      username: username, 
      content: newTodo, 
      tag: newTodoTag 
    }));

    await fetch("http://129.213.24.90:8080/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ 
        username: username, 
        content: newTodo, 
        tag: newTodoTag 
      })
    });
    await fetchTodos();

    setNewTodo("");
    setNewTodoTag("");
  }

  async function handleRemoveTodo(id: number) {
    await fetch(`http://129.213.24.90:8080/api/todos/${id}`, {
      method: "DELETE"
    });
    await fetchTodos();
  }

  return (
    <div>
      <Link href="/">
        <a>← Go home</a>
      </Link>
      <p>Your todo list:</p>

      <label htmlFor="filter">Filter by tag:</label>
      <input type="text" name="filter" value={filterBy} onChange={e => setFilterBy(e.target.value)} />
      <button onClick={handleFilter}>Filter</button>

      {isFiltered && (
        <button onClick={handleRemoveFilter}>
          Remove Filter
        </button>
      )}

      {todos.map(todo => <TodoItem key={todo.id} id={todo.id} todo={todo.name} tag={todo.tag} onRemoveTodo={handleRemoveTodo} />)}
 
      <label htmlFor="add-todo">Todo Name:</label>
      <input type="text" name="add-todo" value={newTodo} onChange={e => setNewTodo(e.target.value)} />

      <label htmlFor="new-todo-tag">Todo Tag:</label>
      <input type="text" name="new-todo-tag" value={newTodoTag} onChange={e => setNewTodoTag(e.target.value)} />

      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default Todos;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { username: context.query.username }
  };
}
