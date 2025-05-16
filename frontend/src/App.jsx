import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Component/Login";
import Register from "./Component/Register";
import AddPost from "./Component/AddPost";
import ProductList from "./Component/ProductList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddPost />} />
          <Route path="/products" element={<ProductList />} />

          {/* Catch all unmatched routes */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20">404 - Page Not Found</h1>
            }
          />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
