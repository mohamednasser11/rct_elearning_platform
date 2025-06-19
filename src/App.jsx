import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import SignupPage from "./pages/signupPage/signupPage";
import LoginPage from "./pages/loginPage/loginPage";
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
import { DepartmentProvider } from "./contexts/departmentContext.jsx";

// ScrollToTop component integrated directly
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const resetScroll = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      const rootElement = document.getElementById("root");
      if (rootElement) {
        rootElement.scrollTop = 0;
      }
    };
    resetScroll();
    requestAnimationFrame(resetScroll);
    setTimeout(resetScroll, 0);
    setTimeout(resetScroll, 10);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <DepartmentProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
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
    </DepartmentProvider>
  );
};

export default App;
