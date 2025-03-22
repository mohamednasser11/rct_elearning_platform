import { useAuth } from "../contexts/authContext";
import NotFound from "./NotFoundPage/404NotFound";

const QuizzesPage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <h1>Quizzes</h1>
      <p>Test your knowledge with our quizzes.</p>
    </div>
  ) : (
    <NotFound />
  );
};

export default QuizzesPage;
