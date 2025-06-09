import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ForStudentsPage from "./pages/forStudentsPage/forStudentsPage";
import ForEducatorsPage from "./pages/forEducatorsPage/forEducatorsPage";
import AiToolsPage from "./pages/aiToolsPage/aiToolsPage";
import CartPage from "./pages/cartPage/cartPage";
import CoursesPage from "./pages/coursesPage/coursesPage";
import CourseDetail from "./pages/coursesPage/coursesMaterial/CourseDetail";
import CourseCreationPage from "./pages/courseCreationPage/CourseCreationPage";
import MainNavigation from "./components/NavBar/MainNavigation";
import Footer from "./components/Footer/Footer";
import { CartProvider } from "./contexts/cartContext.jsx";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/for-students" element={<ForStudentsPage />} />
          <Route path="/for-educators" element={<ForEducatorsPage />} />
          <Route path="/ai-tools" element={<AiToolsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/course-creation" element={<CourseCreationPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
