import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginPage/loginPage";
import SignupPage from "./pages/signupPage/signupPage";
import CoursesPage from "./pages/coursesPage/coursesPage";
import QuizzesPage from "./pages/quizzesPage";
import Navbar from "./components/NavBar/NavBar";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <Router>
     <AuthProvider>
     <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
      </Routes>
     </AuthProvider>
    </Router>
  );
}

export default App;
