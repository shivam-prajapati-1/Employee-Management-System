import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee
} from "../api/employeeApi";
import "./EmployeeForm.css";

export default function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then(res => setEmployee(res.data))
        .catch(() => setError("❌ Failed to load employee"));
    }
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    
    if (!employee.name || !employee.email || !employee.department || !employee.salary) {
      setError("❌ All fields are required");
      return;
    }

    if (!employee.email.includes("@")) {
      setError("❌ Enter a valid email");
      return;
    }

    if (employee.salary <= 0) {
      setError("❌ Salary must be positive");
      return;
    }

    
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (id) {
        await updateEmployee(id, employee);
        setSuccess(" Employee updated successfully");
      } else {
        await createEmployee(employee);
        setSuccess(" Employee added successfully");
      }

      setTimeout(() => navigate("/"), 1200);
    } catch {
      setError("❌ Failed to save employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2 className="form-title">
          {id ? "Edit Employee" : "Add Employee"}
        </h2>

        
        {loading && <div className="spinner">Saving...</div>}

       
        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={onSubmit} className="employee-form">
          <input
            className="form-input"
            placeholder="Name"
            value={employee.name}
            onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value })
            }
          />

          <input
            className="form-input"
            placeholder="Email"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />

          <input
            className="form-input"
            placeholder="Department"
            value={employee.department}
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
          />

          <input
            type="number"
            className="form-input"
            placeholder="Salary"
            value={employee.salary}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value })
            }
          />

          <div className="form-actions">
            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
