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

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.message || error.message);
  }
};

export default {
  summarize,
};
