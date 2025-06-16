import axios from "axios";
import Cookies from "js-cookie";

const summarize = async (file, level) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("level", level);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/ai/file-summarization/`,
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
const generateExam = async (file, level, count) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("level", level);
    formData.append("number_of_questions", count);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/ai/question-generation/`,
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
  summarize,
  generateExam,
};
