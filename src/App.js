import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
  path="/employee"
  element={
    <ProtectedRoute>
      <EmployeeList />
    </ProtectedRoute>
  }
/>


        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <EmployeeForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EmployeeForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
