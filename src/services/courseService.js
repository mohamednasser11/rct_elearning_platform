import axios from "axios";
import Cookies from "js-cookie";

const create = async (departmentId, title, description, thumbnail, price) => {
  try {
    const formData = new FormData();
    formData.append("departmentId", departmentId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image_url", thumbnail);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/courses/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("refresh_token")}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error?.response?.message || error.message);
  }
};

const addLesson = async (courseId, title, description, video) => {
  console.log(title, description, video);
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/courses/${courseId}/lesson/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("refresh_token")}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error?.response?.message || error.message);
  }
};

export default {
  create,
  addLesson,
};
