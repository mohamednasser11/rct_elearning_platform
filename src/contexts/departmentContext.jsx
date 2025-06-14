import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DepartmentContext = createContext();

export const useDepartment = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [currentCourseId, setCurrentCourseId] = useState();
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const token =  Cookies.get('refresh_token') || '';
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/departments/`, config);
      setDepartments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch departments');
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const value = {
    departments,
    loading,
    error,
    fetchDepartments,
    currentCourseId,
    courses,
    setCurrentCourseId,
    setCourses
  };

  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentContext;