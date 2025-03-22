import { useAuth } from "../contexts/authContext";

const CoursesPage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <h1>Courses</h1>
      <p>Browse our available courses.</p>
    </div>
  ) : (
    <div>
      <h1>UnAuthorized!</h1>
    </div>
  );
};

export default CoursesPage;
