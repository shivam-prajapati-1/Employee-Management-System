import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import "./EmployeeList.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); 
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const navigate = useNavigate();

  const loadEmployees = async () => {
  try {
    const res = await getEmployees(search, page, pageSize);
    setEmployees(res.data.data);
    setTotalCount(res.data.totalCount);
  } catch (err) {
    console.error("API Error:", err);
    setEmployees([]);     
    setTotalCount(0);
  }
};


  useEffect(() => {
    loadEmployees();
  }, [search, page, pageSize]); 

  const onDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await deleteEmployee(id);
    loadEmployees();
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Employees</h2>

        <div className="toolbar">
          <input
            className="search-input"
            placeholder="Search name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <div className="add-section">
            <button className="add-btn" onClick={() => navigate("/add")}>
              + Add Employee
            </button>

            <div className="page-info">
              <span>Page-Size:</span>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>₹ {e.salary}</td>
                <td className="action-cell">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${e.id}`)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(e.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
