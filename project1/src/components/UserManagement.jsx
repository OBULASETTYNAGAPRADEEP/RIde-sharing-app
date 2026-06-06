import React, { useEffect, useState } from "react";
import '../css/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:9001/api/user")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setError("Failed to fetch users"));
  }, []);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleCreate = () => {
    fetch("http://localhost:9001/api/user", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(newUser => {
      setUsers([...users, newUser]);
      setForm({name: "", email: ""}); // reset input
    })
    .catch(() => setError("Failed to create user"));
  };

  const startEdit = user => {
    setEditingUser(user.id);
    setForm({name: user.name, email: user.email});
  };

  const handleUpdate = () => {
    fetch(`http://localhost:9001/api/user/${editingUser}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(updated => {
      setUsers(users.map(u => (u.id === editingUser ? updated : u)));
      setEditingUser(null);
      setForm({name: "", email: ""});
    })
    .catch(() => setError("Failed to update user"));
  };

  const handleDelete = id => {
    fetch(`http://localhost:9001/api/user/${id}`, {method: "DELETE"})
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(() => setError("Failed to delete user"));
  };

  return (
    <div className="admin-center-wrapper">
      <div className="admin-panel-container">
        <div className="admin-panel-title">User Management / Admin Panel</div>
        {error && <div className="admin-error">{error}</div>}
        <table className="admin-panel-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser === user.id 
                  ? <input className="admin-input" name="name" value={form.name} onChange={handleChange} />
                  : user.name}
              </td>
              <td>
                {editingUser === user.id
                  ? <input className="admin-input" name="email" value={form.email} onChange={handleChange} />
                  : user.email}
              </td>
              <td>
                {editingUser === user.id ? (
                  <>
                    <button className="admin-button" onClick={handleUpdate}>Save</button>
                    <button className="admin-button" onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="admin-button" onClick={() => startEdit(user)}>Edit</button>
                    <button className="admin-button delete" onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="add-user-title">Add New User</div>
        <input
          className="admin-input"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="admin-input"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <button className="admin-button" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default UserManagement;
