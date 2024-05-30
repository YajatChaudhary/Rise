import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TodoList.scss";
import { Navbar } from "../Navbar/Navbar.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";

const TodoList = ({ token, userId, setToken, setUserId, username }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/todos/${userId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setTodos(response.data);
      console.log(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (title, description, token) => {
    console.log(title, description);
    try {
      console.log("Token being sent:", token); // Log the token
      const response = await axios.post(
        "http://localhost:5000/api/todos",
        {
          title,
          description,
          userId: userId,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log(response);

      if (response.status === 201) {
        setTitle("");
        setDescription("");
        fetchTodos(); // Fetch todos again to update the list
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { title, description }
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setTitle("");
      setDescription("");
      setEditing(null);
      toast.success("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo) => {
    setEditing(todo._id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleSave = () => {
    if (editing) {
      updateTodo(editing);
    } else {
      createTodo(title, description, userId);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {token && (
        <>
          <Navbar
            setToken={setToken}
            setUserId={setUserId}
            username={username}
          />
          <div className="todo-list-container">
            <div className="todo-form">
              <div className="intro">
                <h1>Hi, {username}</h1>
                <br />
                <TextField
                  type="text"
                  label="Search Todos"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="todo-search"
                />
              </div>
              <form action="">
                <h3>Create a New Todo</h3>
                <br />
                <TextField
                  type="text"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="todo-input"
                  required
                />
                <TextField
                  type="text"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="todo-input"
                  required
                />
                <Button variant="contained" onClick={handleSave}>
                  {editing ? "Update" : "Add"}
                </Button>
              </form>
            </div>
            <ul className="todo-list-box">
              {filteredTodos.map((todo) => (
                <li key={todo._id}>
                  <h2>{todo.title}</h2>
                  <Divider />
                  <p>{todo.description}</p>
                  <Tooltip title="Edit todo">
                    <EditIcon
                      onClick={() => handleEdit(todo)}
                      className="todo-edit"
                    />
                  </Tooltip>
                  <Tooltip title="Delete todo">
                    <DeleteIcon
                      onClick={() => deleteTodo(todo._id)}
                      className="todo-delete"
                    />
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default TodoList;
