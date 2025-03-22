import { useAuth } from "../../contexts/authContext";
import NotFound from "../NotFoundPage/404NotFound";
import "./coursesPage.css";

const CoursesPage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <h1>Courses</h1>
      <p>Browse our available courses.</p>
    </div>
  ) : (
    <NotFound />
  );
};

export default CoursesPage;
