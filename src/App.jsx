
import React, { useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [editId, setEditId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (editId === null) {
      const newEmployee = {
        id: Date.now(),
        name: name,
        salary: salary
      };

      setEmployees([...employees, newEmployee]);
    } else {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editId
          ? { ...employee, name: name, salary: salary }
          : employee
      );

      setEmployees(updatedEmployees);
      setEditId(null);
    }

    setName('');
    setSalary('');
  }

  function editEmployee(employee) {
    setName(employee.name);
    setSalary(employee.salary);
    setEditId(employee.id);
  }

  function deleteEmployee(id) {
    setEmployees(
      employees.filter((employee) => employee.id !== id)
    );

    if (editId === id) {
      setEditId(null);
      setName('');
      setSalary('');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-lg rounded bg-white p-6 shadow">
        <h1 className="mb-5 text-center text-2xl font-bold">
          Employee Management
        </h1>

        <form onSubmit={handleSubmit}>
          <label>Employee Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 mt-1 w-full rounded border p-2"
            required
          />

          <label>Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mb-4 mt-1 w-full rounded border p-2"
            required
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-2 text-white"
          >
            {editId === null ? 'Add Employee' : 'Update Employee'}
          </button>
        </form>

        <h2 className="mb-3 mt-6 text-xl font-bold">
          Employee List
        </h2>

        {employees.map((employee) => (
          <div
            key={employee.id}
            className="mb-3 rounded border bg-gray-50 p-3"
          >
            <p>Name: {employee.name}</p>
            <p>Salary: ₹{employee.salary}</p>

            <button
              onClick={() => editEmployee(employee)}
              className="mr-2 mt-2 rounded bg-green-600 px-3 py-1 text-white"
            >
              Edit
            </button>

            <button
              onClick={() => deleteEmployee(employee.id)}
              className="mt-2 rounded bg-red-600 px-3 py-1 text-white"
            >
              Delete
            </button>
          </div>
        ))}

        {employees.length === 0 && (
          <p className="text-gray-500">No employees available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
