import { useAuth } from "../hooks/authContext";

const QuizzesPage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <h1>Quizzes</h1>
      <p>Test your knowledge with our quizzes.</p>
    </div>
  ) : (
    <div>
      <h1>UnAuthorized!</h1>
    </div>
  );
};

export default QuizzesPage;
