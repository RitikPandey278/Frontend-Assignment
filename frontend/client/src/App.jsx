import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


// Private Route Component
const PrivateRoute = ({ children }) => {

  return localStorage.getItem("token")
    ? children
    : <Navigate to="/login" />

};


function App() {

  return (

    <Routes>

      <Route path="/signup" element={<Signup/>} />

      <Route path="/login" element={<Login/>} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/signup"/>} />

    </Routes>

  )

}

export default App;