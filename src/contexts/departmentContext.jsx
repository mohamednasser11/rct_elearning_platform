import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { coursesData } from "../data/coursesData";

const DepartmentContext = createContext();

export const useDepartment = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const departmentsResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/departments/`,
      );
      const newDepartments = { 0: "All" };
      for (const dep of departmentsResponse.data) {
        newDepartments[dep.departmentId] = dep.name;
      }
      setDepartments(newDepartments);

      const coursesResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/courses/`,
      );

      if (coursesResponse.data.data.length > 0) {
        setCourses(
          coursesResponse.data.data.map((course) => ({
            ...course,
            id: course.courseId,
            image_url: `${import.meta.env.VITE_BASE_URL}${course.image_url}`,
          })),
        );
      } else {
        setCourses(coursesData);
        setDepartments({
          0: "All",
          1: "Writing",
          2: "Data Science",
          3: "Photography",
          4: "IT Security",
          5: "Business",
          6: "Design",
          8: "Finance",
          9: "Music",
          10: "Cloud Computing",
          11: "Technology",
          12: "Programming",
          13: "Health",
          14: "DevOps",
          15: "IT",
          16: "Marketing",
        });
      }

      setError(null);
    } catch (err) {
      setError("Failed to fetch departments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    loading,
    error,
    departments,
    courses,
  };

  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentContext;
