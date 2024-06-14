import { Route, Routes, Navigate } from "react-router-dom";
import { Main } from "./components/Main/Main.jsx";
import { Signup } from "./components/signup/Signup.jsx";
import { Login } from "./components/login/Login.jsx";
// import { Jwt } from "jsonwebtoken";

function App() {
  const user = localStorage.getItem("token");
  // const userDetails = Jwt.verify(user,process.env)

  // console.log(userDetails)

  return (
    <Routes>
      {user ? (
        <Route path="/" element={<Main />} />
      ) : (
        <Route path="/" element={<Navigate to="/login" />} />
      )}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

